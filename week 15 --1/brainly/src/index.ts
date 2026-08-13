import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { connectDB, ContentModel, LinkModel, TagModel, UserModel } from "./db";
import { authMiddleware } from "./middleware";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const signupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(10)
    .regex(/^[A-Za-z]+$/, "Username must contain only letters"),
  password: z.string().min(8).max(20),
});

const signinSchema = signupSchema;

const createContentSchema = z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().url(),
  title: z.string().min(1).max(200),
  tags: z.array(z.string().min(1).max(50)).default([]),
});

const deleteContentSchema = z.object({
  contentId: z.string().min(1),
});

const shareSchema = z.object({
  share: z.boolean(),
});

const shareLinkSchema = z.object({
  shareLink: z.string().min(1),
});

type PopulatedTag = {
  title: string;
};

type ContentWithTags = {
  _id: unknown;
  type: string;
  link: string;
  title: string;
  tags: PopulatedTag[];
  createdAt?: Date;
};

function formatContent(content: ContentWithTags) {
  return {
    id: String(content._id),
    type: content.type,
    link: content.link,
    title: content.title,
    tags: content.tags.map((tag) => tag.title),
    addedOn: content.createdAt,
  };
}

function getUserId(req: express.Request, res: express.Response) {
  if (!req.userId) {
    res.status(401).json({ message: "Invalid authorization token" });
    return null;
  }

  return req.userId;
}

async function findOrCreateTags(tagTitles: string[]) {
  const uniqueTitles = [...new Set(tagTitles.map((tag) => tag.trim()).filter(Boolean))];

  return Promise.all(
    uniqueTitles.map(async (title) => {
      const existingTag = await TagModel.findOne({ title });

      if (existingTag) {
        return existingTag._id;
      }

      const newTag = await TagModel.create({ title });
      return newTag._id;
    })
  );
}

app.post("/api/v1/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const { username, password } = result.data;
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ username, password: hashedPassword });

    return res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const { username, password } = result.data;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(403).json({ message: "Wrong username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(403).json({ message: "Wrong username or password" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);

    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const result = createContentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const userId = getUserId(req, res);

    if (!userId) {
      return;
    }

    const { type, link, title, tags } = result.data;
    const tagIds = await findOrCreateTags(tags);

    const content = await ContentModel.create({
      type,
      link,
      title,
      tags: tagIds,
      userId,
    });

    const populatedContent = await content.populate("tags", "title");

    return res.status(200).json({ content: formatContent(populatedContent as unknown as ContentWithTags) });
  } catch (error) {
    console.error("Create content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) {
      return;
    }

    const content = await ContentModel.find({ userId })
      .populate<{ tags: PopulatedTag[] }>("tags", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({ content: content.map((item) => formatContent(item as ContentWithTags)) });
  } catch (error) {
    console.error("Fetch content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const result = deleteContentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const userId = getUserId(req, res);

    if (!userId) {
      return;
    }

    const content = await ContentModel.findById(result.data.contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (String(content.userId) !== userId) {
      return res.status(403).json({ message: "You do not own this content" });
    }

    await content.deleteOne();

    return res.status(200).json({ message: "Delete succeeded" });
  } catch (error) {
    console.error("Delete content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const result = shareSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const userId = getUserId(req, res);

    if (!userId) {
      return;
    }

    if (!result.data.share) {
      await LinkModel.deleteOne({ userId });
      return res.status(200).json({ message: "Sharing disabled" });
    }

    let link = await LinkModel.findOne({ userId });

    if (!link) {
      link = await LinkModel.create({
        hash: crypto.randomBytes(8).toString("hex"),
        userId,
      });
    }

    return res.status(200).json({ link: `/api/v1/brain/${link.hash}` });
  } catch (error) {
    console.error("Share brain error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const result = shareLinkSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid input", errors: result.error.issues });
  }

  try {
    const link = await LinkModel.findOne({ hash: result.data.shareLink });

    if (!link) {
      return res.status(404).json({ message: "Share link not found" });
    }

    const user = await UserModel.findById(link.userId).select("username");

    if (!user) {
      return res.status(404).json({ message: "Share link not found" });
    }

    const content = await ContentModel.find({ userId: user._id })
      .populate<{ tags: PopulatedTag[] }>("tags", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      username: user.username,
      content: content.map((item) => formatContent(item as ContentWithTags)),
    });
  } catch (error) {
    console.error("Public brain error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.all(
  [
    "/api/v1/signup",
    "/api/v1/signin",
    "/api/v1/content",
    "/api/v1/brain/share",
    "/api/v1/brain/:shareLink",
  ],
  (req, res) => {
    const expectedMethods: Record<string, string> = {
      "/api/v1/signup": "POST",
      "/api/v1/signin": "POST",
      "/api/v1/content": "GET, POST, DELETE",
      "/api/v1/brain/share": "POST",
    };

    return res.status(405).json({
      message: "Method not allowed",
      methodUsed: req.method,
      expectedMethod: expectedMethods[req.path] || "GET",
    });
  }
);

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

import mongoose, { model, Schema, Types } from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 10,
      match: /^[A-Za-z]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const contentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["document", "tweet", "youtube", "link"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value: Types.ObjectId) {
          const user = await UserModel.findById(value).select("_id");
          return Boolean(user);
        },
        message: "User does not exist",
      },
    },
  },
  { timestamps: true }
);

const linkSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
export const TagModel = model("Tag", tagSchema);
export const ContentModel = model("Content", contentSchema);
export const LinkModel = model("Link", linkSchema);

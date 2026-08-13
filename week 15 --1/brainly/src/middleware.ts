import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

type JwtPayload = {
  userId: string;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  if (!jwtSecret) {
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as unknown as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
}

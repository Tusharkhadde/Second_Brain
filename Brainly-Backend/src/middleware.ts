import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.split(" ")[1]; // Bearer TOKEN

    const decoded = jwt.verify(token, JWT_PASSWORD) as { userId: string };

    if (decoded) {
      (req as any).userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
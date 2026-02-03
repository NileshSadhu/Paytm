import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      _id?: string;
    }
  }
}

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid." });
    }

    const token = authHeader.split(" ")[1] as string;
    // console.log(token);

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req._id = decoded.id as string;
    // console.log(req._id);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authCheck;

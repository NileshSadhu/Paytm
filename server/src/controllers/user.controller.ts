import type { Request, Response } from "express";
import {
  changePasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validation/user.schema.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Account } from "../models/account.model.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = signUpSchema.parse(req.body);

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser?.email === email) {
      return res.status(409).json({ message: "User already exists." });
    }

    if (existingUser?.username === username) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPwd,
    });

    await newUser.save();

    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000,
    });

    const token: string = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "6h",
    }) as string;

    return res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error.",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        message: "Password does not match",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "6h" });

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error.",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);

    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "Old and new password should be different.",
      });
    }

    const user = await User.findById(req._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error." });
  }
};

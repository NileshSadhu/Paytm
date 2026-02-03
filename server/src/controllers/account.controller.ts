import type { Request, Response } from "express";
import { Account } from "../models/account.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

export const balance = async (req: Request, res: Response) => {
  try {
    if (!req._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const account = await Account.findOne({
      userId: new mongoose.Types.ObjectId(req._id),
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    return res.status(200).json({
      message: "Balance",
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const transferAmount = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!req._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { amount, to } = req.body as {
      amount: number;
      to: string;
    };

    const fromAccount = await Account.findOne({
      userId: new mongoose.Types.ObjectId(req._id),
    }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({
      userId: new mongoose.Types.ObjectId(to),
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid Account" });
    }

    await Account.updateOne(
      { userId: fromAccount.userId },
      { $inc: { balance: -amount } },
    ).session(session);

    await Account.updateOne(
      { userId: toAccount.userId },
      { $inc: { balance: amount } },
    ).session(session);

    await session.commitTransaction();
    return res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    session.endSession();
  }
};

export const showAccounts = async (req: Request, res: Response) => {
  try {
    const account = await Account.find({});

    if (account && account.length === 0) {
      return res.status(400).json({
        message: "No users yet.",
      });
    }

    return res.status(200).json({
      message: "All the users.",
      users: account,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const searchAccount = async (req: Request, res: Response) => {
  try {
    const filter = typeof req.query.filter === "string" ? req.query.filter : "";

    const users = await User.find(
      {
        username: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        _id: 1,
        username: 1,
      },
    );

    return res.status(200).json({
      message: "Users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

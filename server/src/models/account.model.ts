import mongoose, { Schema, Types } from "mongoose";

export interface Account {
  userId: Types.ObjectId;
  balance: number;
  createdAt?: Date;
}

const accountSchema = new Schema<Account>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Account = mongoose.model<Account>("Account", accountSchema);

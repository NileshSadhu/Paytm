import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8).max(16),
  newPassword: z.string().min(8).max(16),
});

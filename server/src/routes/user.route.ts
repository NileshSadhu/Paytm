import { Router } from "express";
import {
  changePassword,
  signIn,
  signUp,
} from "../controllers/user.controller.js";
import authCheck from "../middlewares/authCheck.js";

const userRoute = Router();

// open routes
userRoute.route("/signIn").post(signIn);
userRoute.route("/signUp").post(signUp);

// protected routes
userRoute.route("/change-password").post(authCheck, changePassword);

export default userRoute;

import { Router } from "express";
import authCheck from "../middlewares/authCheck.js";
import {
  balance,
  searchAccount,
  showAccounts,
  transferAmount,
} from "../controllers/account.controller.js";

const accountRoute = Router();

// protected routes

accountRoute.route("/balance").get(authCheck, balance);
accountRoute.route("/transfer-money").post(authCheck, transferAmount);
accountRoute.route("/show-users").get(authCheck, showAccounts);
accountRoute.route("/search").get(searchAccount);

export default accountRoute;

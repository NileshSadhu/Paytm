import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const CLIENT = process.env.CLIENT || "http:localhost:5173";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT,
    credentials: false,
  }),
);

import userRoute from "./routes/user.route.js";
import accountRoute from "./routes/account.route.js";

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/paytm", accountRoute);

export default app;

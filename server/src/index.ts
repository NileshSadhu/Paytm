import dotenv from "dotenv";
import connectDB from "./db/dbConnect.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error while connecting.");
    console.log(e);
  });

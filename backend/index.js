import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import mongoose, { connect } from "mongoose";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `⚙️  Server is running at port : ${process.env.PORT} \nConnected to database`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"; //manage environment variables

import router from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
dotenv.config(); // config dotenv

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    })
  })
  .catch((err) => console.log(err))

app.use("/api/user",router);

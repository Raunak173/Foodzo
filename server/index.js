import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import foodRouter from "./routes/food.js";
import dotenv from "dotenv";

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/food", foodRouter);
app.get("/", (req, res) => {
  res.send("Welcome to FOOD API");
});

const mongo = process.env.MONGODB_URL;

mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

const port = 5000;

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const MONGODB_URI =
  "mongodb+srv://raunak173:raunak173@cluster0.achg4.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

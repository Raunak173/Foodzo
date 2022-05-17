import express from "express";
const router = express.Router();

import { createFood, getFoods } from "../controllers/food.js";

router.post("/", createFood);
router.get("/", getFoods);

export default router;

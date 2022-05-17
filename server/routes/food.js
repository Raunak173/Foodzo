import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createFood,
  deleteFood,
  getRelatedFoods,
  getFood,
  getFoods,
  getFoodsBySearch,
  getFoodsByTag,
  getFoodsByUser,
  likeFood,
  updateFood,
} from "../controllers/Food.js";

router.get("/search", getFoodsBySearch);
router.get("/tag/:tag", getFoodsByTag);
router.post("/relatedFoods", getRelatedFoods);
router.get("/", getFoods);
router.get("/:id", getFood);

router.post("/", auth, createFood);
router.delete("/:id", auth, deleteFood);
router.patch("/:id", auth, updateFood);
router.get("/userFoods/:id", auth, getFoodsByUser);
router.patch("/like/:id", auth, likeFood);

export default router;

import express from "express";
const router = express.Router();

import { signup } from "../controllers/user.js";

router.post("/signup", signup); //Post route  to create new user for app

export default router;

import express from "express";
const router = express.Router();

import { signup, signin } from "../controllers/user.js";

router.post("/signup", signup); //Post route to create new user for app
router.post("/signin", signin); //Post route so that user can login in our app

export default router;

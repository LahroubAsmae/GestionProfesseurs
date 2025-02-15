import express from "express";
import { signup, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route pour l'inscription
router.post("/signup", signup);
router.post("/login", loginUser);

export default router;

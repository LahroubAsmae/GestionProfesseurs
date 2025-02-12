import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

// Route pour l'inscription
router.post("/signup", signup);

// Route pour la connexion
router.post("/signin", signin);

export default router;

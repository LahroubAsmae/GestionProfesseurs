import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.ADMIN_EMAIL;

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Accès refusé, token manquant" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Token invalide" });
  }
};

// Route pour récupérer les infos du profil utilisateur
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// Inscription des professeurs
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "professor"
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Inscription réussie" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// Connexion (Admin & Professeur)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification de la connexion Admin
    if (email === process.env.ADMIN_EMAIL) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
      }

      const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ success: true, token, role: "admin" });
    }

    // Vérification de la connexion d'un professeur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ success: true, token, role: user.role });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;

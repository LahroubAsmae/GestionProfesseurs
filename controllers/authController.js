import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Inscription d'un utilisateur
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      name,
      email,
      password, // Le mot de passe sera hashé automatiquement grâce au middleware
    });

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Le token expire après 1 heure
    });

    // Retourner le token et les informations de l'utilisateur (sans le mot de passe)
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};
//Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    // Connexion réussie
    res.status(200).json({ success: true, message: "Connexion réussie", user });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

import Professor from "../models/Professor.js";
import jwt from "jsonwebtoken";

// Inscription d'un professeur
export const signup = async (req, res) => {
  const { firstName, lastName, email, phone, subjects, status, password } =
    req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingProfessor = await Professor.findOne({ email });
    if (existingProfessor) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Créer un nouveau professeur
    const professor = await Professor.create({
      firstName,
      lastName,
      email,
      phone,
      subjects,
      status,
      password, // Le mot de passe sera hashé automatiquement grâce au middleware
    });

    // Générer un token JWT
    const token = jwt.sign({ id: professor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, professor });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
};

// Connexion d'un professeur
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si le professeur existe
    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res.status(404).json({ message: "Professeur non trouvé." });
    }

    // Vérifier le mot de passe
    const isMatch = await professor.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: professor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, professor });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};

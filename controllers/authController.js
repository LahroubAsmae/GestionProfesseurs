import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Inscription d'un utilisateur
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "professor", // Par défaut, le rôle est "professor" si non spécifié
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Générer un token JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      "secret_key",
      { expiresIn: "1h" }
    );

    // Renvoyer une réponse réussie
    res
      .status(201)
      .json({ success: true, message: "Inscription réussie", token });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

//Login
export const loginUser = async (req, res) => {
  console.log("Requête reçue avec :", req.body); // Ajout du log

  const { email, password } = req.body;

  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "Admin1234";

    if (email === adminEmail) {
      console.log("Tentative de connexion admin...");
      
      if (password !== adminPassword) {
        console.log("Mot de passe incorrect pour admin");
        return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
      }

      const token = jwt.sign({ role: "admin" }, "secret_key", { expiresIn: "1h" });
      return res.status(200).json({ success: true, token, role: "admin" });
    }

    console.log("Recherche utilisateur dans la base de données...");
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Utilisateur non trouvé !");
      return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Mot de passe incorrect !");
      return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", { expiresIn: "1h" });

    console.log("Connexion réussie, envoi du token.");
    res.status(200).json({ success: true, token, role: user.role });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};


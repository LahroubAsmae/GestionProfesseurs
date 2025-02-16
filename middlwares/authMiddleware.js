import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Extraire le token depuis le header Authorization

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token manquant, veuillez vous reconnecter." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décode le token avec la clé secrète
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    req.user = user; // Attacher l'utilisateur à la requête
    next(); // Passer à la suite
  } catch (err) {
    console.error("Erreur d'authentification :", err);
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};
export default authMiddleware;

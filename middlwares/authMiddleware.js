import jwt from "jsonwebtoken";
import Professor from "../models/Professor.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraire le token
      token = req.headers.authorization.split(" ")[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter le professeur à la requête
      req.professor = await Professor.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide." });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Pas de token, accès refusé." });
  }
};

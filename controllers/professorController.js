// controllers/professorController.js
import jwt from "jsonwebtoken"; // Importation de la bibliothèque jsonwebtoken

import Professor from "../models/Professor.js";

// Récupérer les données du professeur par email
// Récupérer le profil du professeur par email
export const getProfessorProfile = async (req, res) => {
  const { email } = req.params;
  try {
    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res.status(404).json({ message: "Professeur non trouvé" });
    }
    res.status(200).json({ professor });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour les données du professeur
export const updateProfessor = async (req, res) => {
  const { authorization } = req.headers; // Récupérer l'en-tête Authorization
  const { email, firstName, lastName, phone, subjects, status } = req.body;

  // Vérifier que le token est présent dans les headers
  if (!authorization) {
    return res.status(401).json({ success: false, message: "Token manquant" });
  }

  try {
    // Extraire et vérifier le token JWT
    const token = authorization.split(" ")[1]; // Assurez-vous que l'en-tête soit sous forme "Bearer token"
    const decoded = jwt.verify(token, "votre_clé_secrète"); // Vérification du token (remplacez 'votre_clé_secrète' par votre clé secrète)

    // Vérifier si l'email dans le token correspond à celui envoyé dans le body (optionnel, pour plus de sécurité)
    if (decoded.email !== email) {
      return res
        .status(403)
        .json({ success: false, message: "Accès interdit" });
    }

    // Trouver le professeur et mettre à jour ses données
    const professor = await Professor.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        phone,
        subjects,
        status,
      },
      { new: true }
    );

    if (!professor) {
      return res
        .status(404)
        .json({ success: false, message: "Professeur non trouvé" });
    }

    // Renvoi de la réponse avec les données mises à jour
    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      professor,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

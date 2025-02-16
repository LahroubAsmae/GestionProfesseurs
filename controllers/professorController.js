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

// Mise à jour du profil professeur par ID
export const updateProfessorProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'subjects', 'status'];
  const missingFields = requiredFields.filter(field => updateData[field] === undefined || updateData[field] === '');

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Champs manquants : ${missingFields.join(', ')}` });
  }

  try {
    const professor = await Professor.findById(id);
    if (!professor) {
      return res.status(404).json({ message: "Professeur non trouvé" });
    }

    Object.assign(professor, updateData);
    await professor.save();

    res.status(200).json({ message: "Profil mis à jour avec succès", professor });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
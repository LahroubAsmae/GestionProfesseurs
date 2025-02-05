const Professor = require('../models/professorModel');

const getProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProfessor = async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // 🔍 Ajoute ceci pour voir les données reçues
    const { nom, prenom, email, telephone, matieres, statut } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '';

    const professor = new Professor({ nom, prenom, email, telephone, matieres: JSON.parse(matieres), statut, photo });
    await professor.save();

    res.status(201).json(professor);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getProfessors, addProfessor };

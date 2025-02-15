import Professor from "../models/Professor.js";
import { generateQRCode } from "../utils/generateQRCode.js";

// Ajouter un professeur
export const addProfessor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subjects,
      status,
      profilePicture,
    } = req.body;

    // Attendre la résolution de la promesse QR Code
    const qrCodeUrl = await generateQRCode(email); // Utilisation de `await` ici pour attendre que la promesse se résolve

    const newProfessor = new Professor({
      firstName,
      lastName,
      email,
      phone,
      subjects,
      status,
      profilePicture,
      qrCodeUrl,
    });

    await newProfessor.save();
    res.status(201).json(newProfessor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du professeur", error: err });
  }
};
export const getProfessorProfile = async (req, res) => {
  const { email } = req.params;

  try {
    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res
        .status(404)
        .json({ success: false, message: "Professeur non trouvé" });
    }

    res.status(200).json({ success: true, professor });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil du professeur :",
      error
    );
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Récupérer un professeur par ID
export const getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: "Professeur non trouvé" });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
// Récupérer tous les professeurs
export const getProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des professeurs",
      error: err,
    });
  }
};

// Modifier un professeur
export const updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProfessor = await Professor.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedProfessor);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du professeur",
      error: err,
    });
  }
};

// Supprimer un professeur
export const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    await Professor.findByIdAndDelete(id);
    res.status(200).json({ message: "Professeur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du professeur",
      error: err,
    });
  }
};
// Importer un fichier Excel
export const importProfessors = async (req, res) => {
  try {
    const { professors } = req.body;

    // Vérifier que toutes les données obligatoires sont présentes
    for (const professor of professors) {
      const { firstName, lastName, email, phone, subjects, status } = professor;

      if (!firstName || !lastName || !email || !phone || !subjects || !status) {
        return res.status(400).json({
          message: "Toutes les colonnes obligatoires doivent être remplies.",
        });
      }

      // Vérifier que le statut est valide
      if (!["permanent", "vacataire"].includes(status)) {
        return res.status(400).json({
          message: `Statut invalide pour ${firstName} ${lastName}. Doit être "permanent" ou "vacataire".`,
        });
      }
    } // <-- Accolade fermante manquante pour la boucle `for`

    // Insérer les données dans MongoDB
    await Professor.insertMany(professors);

    res.status(200).json({ message: "Importation réussie !" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'importation des professeurs.",
      error: error.message,
    });
  }
};

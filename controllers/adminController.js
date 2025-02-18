import Professor from "../models/Professor.js";
import { generateQRCode } from "../utils/generateQRCode.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";
dotenv.config();
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

// 📌 Générer un mot de passe sécurisé aléatoire
const generatePassword = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};
// 📌 Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Ajouter un professeur
export const addProfessor = async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // 🔍 Ajoute ceci pour voir les données reçues
    const { firstName, lastName, email, phone, subjects, status } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : "";

    // Vérifier si l'email existe déjà dans la collection Professor
    const existingProfessor = await Professor.findOne({ email });
    if (existingProfessor)
      return res
        .status(400)
        .json({ message: "L'email est déjà utilisé dans la plateforme" });

    // Vérifier si l'email existe déjà dans la collection User (si tu l'utilises aussi pour les utilisateurs généraux)
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "L'email est déjà utilisé dans l'application" });

    // Générer et hasher le mot de passe
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la collection User
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "professor",
    });
    await newUser.save();

    // Créer le professeur dans la collection Professor
    const professor = new Professor({
      firstName,
      lastName,
      email,
      phone,
      subjects: JSON.parse(subjects),
      status,
      profilePicture,
    });
    await professor.save();

    // Envoyer l'email avec le mot de passe
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Bienvenue sur notre plateforme",
      html: `
        <h2>Bienvenue ${firstName} ${lastName} !</h2>
        <p>Votre compte a été créé avec succès.</p>
        <p>Voici votre mot de passe temporaire :</p>
        <h3>${password}</h3>
        <p>Connectez-vous et changez votre mot de passe dès que possible.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json(professor);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    res.status(500).json({ message: error.message });
  }
};
//recuperer les donner pour generer des cartes
export const GeneratCard = async (req, res) => {
  const { email } = req.body; // L'email envoyé dans la requête

  try {
    // Recherche du professeur dans la base de données
    const professor = await Professor.findOne({ email });

    if (!professor) {
      return res.status(404).json({ error: "Professeur non trouvé" });
    }

    // Générer un QR code avec les informations du professeur
    const qrData = JSON.stringify({
      firstName: professor.firstName,
      lastName: professor.lastName,
      email: professor.email,
      phone: professor.phone,
      subjects: professor.subjects,
      status: professor.status,
    });
    console.log("Recherche du professeur avec email:", email); // Vérifie l'email envoyé

    const qrCode = await QRCode.toDataURL(qrData);

    // Retourner les informations du professeur avec le QR code
    res.json({ professor, qrCode });
  } catch (error) {
    console.error("Erreur lors de la génération de la carte:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
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

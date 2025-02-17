// routes/professorRoutes.js
import express from "express";
import {
  getProfessorProfile,
  updateProfessorProfile,
} from "../controllers/professorController.js";
import authMiddleware from "../middlwares/authMiddleware.js";
import { fileURLToPath } from "url";
import path from "path";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Recréer __dirname en mode ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir les fichiers statiques du dossier uploads
router.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
// Récupérer les données du professeur par email
router.get("/profile/:email", getProfessorProfile);

// Mettre à jour les données du professeur
router.put(
  "/update/:id",
  upload.single("profilePicture"),
  updateProfessorProfile
);

export default router;

// routes/professorRoutes.js
import express from "express";
import {
  getProfessorProfile,
  updateProfessor,
} from "../controllers/professorController.js";
//import authMiddleware from "../middlwares/authMiddleware.js";

const router = express.Router();

// Récupérer les données du professeur par email
router.get("/profile/:email", getProfessorProfile);

// Mettre à jour les données du professeur
router.put("/update", updateProfessor);

export default router;

import express from "express";

import {
  addProfessor,
  getProfessors,
  updateProfessor,
  deleteProfessor,
  importProfessors,
  getProfessorById,
  GeneratCard,
} from "../controllers/adminController.js";
import authMiddleware from "../middlwares/authMiddleware.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Routes pour les professeurs
router.post("/", upload.single("profilePicture"), addProfessor);
router.get("/", getProfessors);
router.post("/generate-card", GeneratCard);
router.get("/generate-card/:email", generateCard); // GET pour envoyer l'email dans l'URL

router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);
router.post("/import", importProfessors);
router.get("/:id", getProfessorById);

export default router;

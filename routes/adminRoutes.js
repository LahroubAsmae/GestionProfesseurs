import express from "express";

import {
  addProfessor,
  getProfessors,
  updateProfessor,
  deleteProfessor,
  importProfessors,
  getProfessorById,
} from "../controllers/adminController.js";
import authMiddleware from "../middlwares/authMiddleware.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Routes pour les professeurs
router.post("/", upload.single("profilePicture"), addProfessor);
router.get("/", getProfessors);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);
router.post("/import", importProfessors);
router.get("/:id", getProfessorById);

export default router;

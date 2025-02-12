import express from "express";

import {
  addProfessor,
  getProfessors,
  updateProfessor,
  deleteProfessor,
  importProfessors,
} from "../controllers/professorController.js";

const router = express.Router();

// Routes pour les professeurs
router.post("/", addProfessor);
router.get("/", getProfessors);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);
router.post("/import", importProfessors);

export default router;

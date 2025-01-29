const express = require("express");
const {
  getProfessors,
  addProfessor,
  uploadProfessors,
  generatePDF,
} = require("../controllers/professorController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/", getProfessors);
router.post("/", addProfessor);
router.post("/upload", upload.single("file"), uploadProfessors);
router.get("/:id/card", generatePDF);

module.exports = router;

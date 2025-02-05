const express = require('express');
const { getProfessors, addProfessor } = require('../controllers/professorController');
const upload = require('../utils/upload');

const router = express.Router();

router.get('/', getProfessors);
router.post('/', upload.single('photo'), addProfessor);

module.exports = router;

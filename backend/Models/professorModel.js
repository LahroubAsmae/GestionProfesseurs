const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String,
  matiere: String,
  statut: String,
  photo: String
});

module.exports = mongoose.model('Professor', professorSchema);

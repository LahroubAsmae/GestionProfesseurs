const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ["permanent", "contract"], required: true },
});

module.exports = mongoose.model("Professor", professorSchema);

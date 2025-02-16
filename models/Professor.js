import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ProfessorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  subjects: { type: [String], required: true },
  status: { type: String, required: true },
  profilePicture: { type: String }, // Optionnel
  
  // password: { type: String, required: true }, // Ajout du champ password
});



// Hash du mot de passe avant de sauvegarder
/*ProfessorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
ProfessorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};*/

const Professor = mongoose.model("Professor", ProfessorSchema);

export default Professor;

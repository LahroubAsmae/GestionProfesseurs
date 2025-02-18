import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ProfessorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    subjects: { type: [String], required: true },
    status: { type: String, required: true },
    profilePicture: { type: String }, // Optionnel
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 🔗 Lien avec User
  },
  { timestamps: true }
);

const Professor = mongoose.model("Professor", ProfessorSchema);

export default Professor;

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Connexion à MongoDB
mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/nomDeTaBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const utilisateurSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

async function creerAdmin() {
  const hashedPassword = await bcrypt.hash("motdepasseadmin", 10);
  
  const admin = new Utilisateur({
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("Admin créé avec succès !");
  mongoose.connection.close();
}

creerAdmin();

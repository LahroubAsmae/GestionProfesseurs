const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const professorRoutes = require('./routes/professorRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/professors', professorRoutes);
app.use((err, req, res, next) => {
    console.error("Erreur côté serveur :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  });
  

  app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
   // Permet à toutes les origines d'accéder au backend
    
app.listen(process.env.PORT, () => console.log(`Serveur sur ${process.env.PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import professorRoutes from "./routes/professorRoutes.js";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes.js";
import multer from "multer";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
// Configure multer pour stocker les fichiers dans le dossier 'uploads/profiles'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/professors", professorRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

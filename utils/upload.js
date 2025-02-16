import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Obtenir __dirname en mode ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le chemin complet du dossier 'uploads'
const uploadDir = path.join(__dirname, 'uploads');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),  // Utiliser le chemin 'uploads'
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),  // Nom du fichier
});

// Initialisation de multer avec la configuration de stockage
export const upload = multer({ storage });

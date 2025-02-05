const fs = require('fs');
const path = require('path');
const multer = require('multer');

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
const upload = multer({ storage });

// Exporter la configuration multer pour l'utiliser ailleurs dans ton code
module.exports = upload;

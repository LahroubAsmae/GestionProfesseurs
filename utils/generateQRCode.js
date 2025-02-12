import QRCode from 'qrcode';

// Fonction pour générer l'URL d'un QR Code
export const generateQRCode = (data) => {
  const qrCodeUrl = `https://www.example.com/professor/${data}`; // URL personnalisée pour chaque professeur
  return QRCode.toDataURL(qrCodeUrl); // Génère un QR code en base64
};

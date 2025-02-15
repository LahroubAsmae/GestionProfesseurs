import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

// Styles PDF
const styles = StyleSheet.create({
  page: { flexDirection: "row", justifyContent: "center", padding: 20 },
  card: {
    width: 250,
    height: 150,
    padding: 10,
    border: "1px solid black",
    borderRadius: 5,
  },
  name: { fontSize: 14, fontWeight: "bold" },
  subject: { fontSize: 12, marginTop: 5 },
  image: { width: 50, height: 50, borderRadius: "50%", marginBottom: 5 },
  qr: { marginTop: 10, width: 50, height: 50 },
});

// Fonction pour générer le QR code en base64
const generateQRCode = async (name, subject) => {
  const qrData = JSON.stringify({ nom: name, matiere: subject });
  try {
    return await QRCode.toDataURL(qrData);
  } catch (error) {
    console.error("Erreur de génération du QR Code :", error);
    return "";
  }
};

// Composant PDF
const ProfessionalCard = ({ name, subject, photo, qrData }) => {
  const [qrCodeImage, setQrCodeImage] = React.useState("");

  React.useEffect(() => {
    generateQRCode(name, subject).then(setQrCodeImage);
  }, [name, subject]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <Image style={styles.image} src={photo} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
          {qrCodeImage && <Image style={styles.qr} src={qrCodeImage} />}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalCard;

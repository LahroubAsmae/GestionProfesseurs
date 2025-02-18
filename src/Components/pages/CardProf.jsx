import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
  },
  cardContainer: {
    width: 320,
    border: "2px solid #3498db",
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: "2px solid #3498db",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#34495e",
    textAlign: "left",
    width: "100%",
  },
  qrCode: {
    marginTop: 10,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  boldLabel: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
});

const ProfessionalCard = ({ professor, qrCodeImage, photo }) => {
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Carte Professionnelle</Text>

          {/* Affichage de la photo du professeur */}
          {photo && <Image src={photo} style={styles.profileImage} />}

          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>Nom Professeur :</Text>{" "}
            {professor.lastName} {professor.firstName}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>Statut :</Text> {professor.status}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>Matière Enseignée :</Text>{" "}
            {professor.subjects}
          </Text>

          {/* QR Code */}
          {qrCodeImage && <Image src={qrCodeImage} style={styles.qrCode} />}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalCard;

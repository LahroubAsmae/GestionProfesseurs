import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfessionalCard from "./CardProf";

const Card = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    photo: "",
    qrData: "https://example.com/professeur-details",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Générer une Carte Professionnelle</h1>
      <input type="text" name="name" placeholder="Nom et prénom" onChange={handleChange} className="border p-2 mb-2" />
      <input type="text" name="subject" placeholder="Matière enseignée" onChange={handleChange} className="border p-2 mb-2" />
      <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 mb-2" />

      {formData.name && formData.subject && formData.photo && (
        <PDFDownloadLink
          document={<ProfessionalCard {...formData} />}
          fileName="Carte_Professionnelle.pdf"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Télécharger la Carte en PDF
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default Card;

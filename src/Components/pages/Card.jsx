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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Effet de carte flottante */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Générer une Carte Professionnelle
            </h1>

            <div className="divide-y divide-gray-200">
              <div className="py-4 space-y-6 text-gray-700 sm:text-lg">
                {/* Champ Nom */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom et prénom"
                    onChange={handleChange}
                    className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Nom et prénom
                  </label>
                </div>

                {/* Champ Matière */}
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Matière enseignée"
                    onChange={handleChange}
                    className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Matière enseignée
                  </label>
                </div>

                {/* Upload d'image */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Importer une photo
                  </label>
                </div>

                {/* Aperçu de l'image */}
                {formData.photo && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={formData.photo}
                      alt="Aperçu"
                      className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
                    />
                  </div>
                )}

                {/* Bouton de téléchargement */}
                {formData.name && formData.subject && formData.photo && (
                  <div className="mt-6 text-center">
                    <PDFDownloadLink
                      document={<ProfessionalCard {...formData} />}
                      fileName="Carte_Professionnelle.pdf"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                    >
                      Télécharger la Carte en PDF
                    </PDFDownloadLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

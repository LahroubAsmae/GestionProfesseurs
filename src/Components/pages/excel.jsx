import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    setError(""); // Réinitialiser l'erreur
    const file = event.target.files[0];

    if (!file) {
      setError("Veuillez sélectionner un fichier Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Vérifier si les colonnes requises existent
        const requiredColumns = ["Nom", "Email", "Age","Telephone","MatièresEnseignées","photo"];
        const sheetColumns = Object.keys(jsonData[0] || {});

        for (const col of requiredColumns) {
          if (!sheetColumns.includes(col)) {
            setError(`Colonne manquante : ${col}`);
            return;
          }
        }

        // Valider les données
        const validData = jsonData.filter((row) =>
          requiredColumns.every((col) => row[col] !== undefined && row[col] !== "")
        );

        setData(validData);
      } catch (err) {
        setError("Erreur lors de la lecture du fichier. Assurez-vous qu'il est bien formaté.");
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Effet de carte flottante */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Importation de fichier Excel
            </h2>

            {/* Input File */}
            <div className="relative">
              <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className="hidden" id="fileUpload" />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Choisir un fichier
              </label>
            </div>

            {/* Message d'erreur */}
            {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
          </div>
        </div>
      </div>

      {/* Tableau des données importées */}
      {data.length > 0 && (
        <div className="mt-10 w-full max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Données Importées</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-6 py-3">Nom</th>
                <th className="border border-gray-300 px-6 py-3">Email</th>
                <th className="border border-gray-300 px-6 py-3">Age</th>
                <th className="border border-gray-300 px-6 py-3">Telephone</th>
                <th className="border border-gray-300 px-6 py-3">Matières enseignées</th>
                <th className="border border-gray-300 px-6 py-3">Photos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="text-center even:bg-gray-100 hover:bg-gray-200 transition">
                  <td className="border border-gray-300 px-6 py-3">{row.Nom}</td>
                  <td className="border border-gray-300 px-6 py-3">{row.Email}</td>
                  <td className="border border-gray-300 px-6 py-3">{row.Age}</td>
                  <td className="border border-gray-300 px-6 py-3">{row.Telephone}</td>
                  <td className="border border-gray-300 px-6 py-3">{row.MatièresEnseignées}</td>
                  <td className="border border-gray-300 px-6 py-3">{row.photo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;

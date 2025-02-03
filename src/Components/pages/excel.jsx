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
        const requiredColumns = ["Nom", "Email", "Age"];
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
    <div className="p-4">
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data.length > 0 && (
        <table className="mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.Nom}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Email}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelUploader;

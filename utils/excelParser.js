import xlsx from 'xlsx';

// Fonction pour parser un fichier Excel
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const workbook = xlsx.read(file.data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const professors = jsonData.map(data => ({
      firstName: data['Prénom'],
      lastName: data['Nom'],
      email: data['Email'],
      phone: data['Téléphone'],
      subjects: data['Matières'].split(','), // Matières séparées par des virgules
      status: data['Statut'],
      profilePicture: data['Photo'], // URL de la photo
    }));

    resolve(professors);
  });
};

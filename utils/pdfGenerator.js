const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (professor, qrCode) => {
  const doc = new PDFDocument();
  const pdfPath = `./cards/${professor._id}.pdf`;
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Name: ${professor.firstName} ${professor.lastName}`);
  doc.text(`Email: ${professor.email}`);
  doc.text(`Phone: ${professor.phone}`);
  doc.text(`Subjects: ${professor.subjects.join(', ')}`);
  doc.text(`Status: ${professor.status}`);
  doc.image(qrCode, { width: 100 });
  doc.end();
  return pdfPath;
};

module.exports = { generatePDF };
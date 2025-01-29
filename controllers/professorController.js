const fs = require("fs");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");
const Professor = require("../models/professorModel"); // Utilisé uniquement si MongoDB est activé

// Get all professors
const getProfessors = async (req, res) => {
  try {
    const professors = await Professor.find(); // MongoDB
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new professor
const addProfessor = async (req, res) => {
  try {
    const { name, email, phone, subject, status } = req.body;
    const professor = await Professor.create({
      name,
      email,
      phone,
      subject,
      status,
    }); // MongoDB
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload professors via Excel
const uploadProfessors = async (req, res) => {
  try {
    const file = xlsx.readFile(req.file.path);
    const sheets = file.SheetNames;
    const data = xlsx.utils.sheet_to_json(file.Sheets[sheets[0]]);

    const newProfessors = data.map((row) => ({
      name: row.Name,
      email: row.Email,
      phone: row.Phone,
      subject: row.Subject,
      status: row.Status,
    }));

    await Professor.insertMany(newProfessors); // MongoDB
    fs.unlinkSync(req.file.path); // Clean up the file
    res.json({
      message: "Professors added successfully",
      added: newProfessors.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate PDF for a professor
const generatePDF = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id); // MongoDB
    if (!professor) return res.status(404).send("Professor not found");

    const doc = new PDFDocument();
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=professor_${professor._id}_card.pdf`
    );
    doc.pipe(res);

    doc.fontSize(20).text(`Professor ID Card`, { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Name: ${professor.name}`);
    doc.text(`Email: ${professor.email}`);
    doc.text(`Phone: ${professor.phone}`);
    doc.text(`Subject: ${professor.subject}`);
    doc.text(`Status: ${professor.status}`);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfessors, addProfessor, uploadProfessors, generatePDF };

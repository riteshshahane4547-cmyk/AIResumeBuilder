const aiService = require('../services/aiService');
const fs = require('fs');
const pdf = require('pdf-parse-new');

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const { jobDescription } = req.body;
    let resumeText = '';

    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      try {
        const data = await pdf(dataBuffer);
        resumeText = data.text;
      } catch (pdfError) {
         console.error("PDF Parsing Error:", pdfError);
         // Fallback: try to read as text if PDF parsing fails significantly, 
         // but usually this means a corrupted PDF or one with complex XRef table.
         // Let's return a specific error to the user.
         fs.unlinkSync(req.file.path);
         return res.status(400).json({ error: 'Failed to parse PDF file. The file might be corrupted or encrypted.', details: pdfError.message });
      }
    } else {
      // Assume text file for simplicity if not PDF, or handle DOCX later if needed
      resumeText = fs.readFileSync(req.file.path, 'utf8');
    }

    const analysis = await aiService.analyzeResume(resumeText, jobDescription);

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ analysis });
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    res.status(500).json({ error: 'Failed to analyze resume', details: error.message });
  }
};

const aiService = require('../services/aiService');
const fs = require('fs');
const pdf = require('pdf-parse');

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const { jobDescription } = req.body;
    let resumeText = '';

    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdf(dataBuffer);
      resumeText = data.text;
    } else {
      // Assume text file for simplicity if not PDF, or handle DOCX later if needed
      resumeText = fs.readFileSync(req.file.path, 'utf8');
    }

    const analysis = await aiService.analyzeResume(resumeText, jobDescription);

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
};

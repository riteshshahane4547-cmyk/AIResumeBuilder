const express = require('express');
const router = express.Router();
const resumeAnalyzerController = require('../controllers/resumeAnalyzerController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), resumeAnalyzerController.analyzeResume);

module.exports = router;

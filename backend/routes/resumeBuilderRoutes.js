const express = require('express');
const router = express.Router();
const resumeBuilderController = require('../controllers/resumeBuilderController');
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

router.post('/generate', resumeBuilderController.generateResume);
router.post('/chat', resumeBuilderController.chatWithAI);
router.post('/upload-context', upload.single('file'), resumeBuilderController.uploadContextDocument);
router.post('/download', resumeBuilderController.downloadResumePDF);
router.get('/history', resumeBuilderController.getHistory);

module.exports = router;

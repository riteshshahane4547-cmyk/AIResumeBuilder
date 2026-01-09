const express = require('express');
const router = express.Router();
const resumeBuilderController = require('../controllers/resumeBuilderController');

router.post('/generate', resumeBuilderController.generateResume);
router.post('/download', resumeBuilderController.downloadResumePDF);
router.get('/history', resumeBuilderController.getHistory);

module.exports = router;

const express = require('express');
const cors = require('cors');
const path = require('path');
const resumeBuilderRoutes = require('./routes/resumeBuilderRoutes');
const resumeAnalyzerRoutes = require('./routes/resumeAnalyzerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/builder', resumeBuilderRoutes);
app.use('/api/analyzer', resumeAnalyzerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AI Resume Builder & Analyzer API is running');
});

module.exports = app;

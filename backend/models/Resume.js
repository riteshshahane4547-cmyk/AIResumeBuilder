const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resume = sequelize.define('Resume', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resume_text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // New Fields
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Storing lists as JSON strings
  certificates: {
    type: DataTypes.TEXT, 
    allowNull: true
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hobbies: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  projects: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Resume;

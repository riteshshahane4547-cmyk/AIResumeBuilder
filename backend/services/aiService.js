const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

const getPromptTemplate = (filename) => {
  const promptPath = path.join(__dirname, '../../ai-prompts', filename);
  try {
    return fs.readFileSync(promptPath, 'utf8');
  } catch (error) {
    console.error(`Error reading prompt file ${filename}:`, error);
    return '';
  }
};

const generateResumeContent = async (data) => {
  let prompt = getPromptTemplate('resume_builder_prompt.txt');
  
  // Replace placeholders
  prompt = prompt.replace('{{name}}', data.name)
                 .replace('{{education}}', data.education)
                 .replace('{{skills}}', data.skills)
                 .replace('{{experience}}', data.experience)
                 .replace('{{job_role}}', data.jobRole);

  if (!process.env.OPENAI_API_KEY) {
    return mockResumeGeneration(data);
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant that outputs only valid JSON." }, { role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    return mockResumeGeneration(data);
  }
};

const analyzeResume = async (resumeText, jobDescription) => {
  let prompt = getPromptTemplate('resume_analyzer_prompt.txt');
  
  prompt = prompt.replace('{{resume_text}}', resumeText)
                 .replace('{{job_description}}', jobDescription || 'General Software Engineering Role');

  if (!process.env.OPENAI_API_KEY) {
    return mockResumeAnalysis();
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    return mockResumeAnalysis();
  }
};

// Mock functions for demonstration when API key is missing
const mockResumeGeneration = (data) => {
  return JSON.stringify({
    personalInfo: {
      fullName: data.name,
      role: data.jobRole,
      email: data.email || "email@example.com",
      phone: "+1 234 567 890",
      linkedin: "linkedin.com/in/user"
    },
    summary: `Motivated and skilled ${data.jobRole} with experience in ${data.skills}. Proven track record of delivering high-quality results.`,
    skills: data.skills.split(',').map(s => s.trim()),
    experience: [
      {
        role: "Software Engineer",
        company: "Tech Corp",
        duration: "2020 - Present",
        description: data.experience || "Developed scalable web applications."
      }
    ],
    education: [
      {
        degree: "Bachelor of Technology",
        school: "University of Technology",
        year: "2023"
      }
    ]
  }, null, 2);
};

const mockResumeAnalysis = () => {
  return `
  - ATS Compatibility Score: 75/100
  - Strengths: Good use of keywords, clear structure.
  - Weaknesses: Some formatting issues, lack of quantitative results.
  - Missing Skills: Cloud computing, Docker.
  - Improvement Suggestions: Add more numerical achievements, improve formatting.
  `;
};

module.exports = {
  generateResumeContent,
  analyzeResume
};

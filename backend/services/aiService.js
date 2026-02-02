const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || 'mock-key',
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Resume Builder",
  }
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
  prompt = prompt.replace(/{{name}}/g, data.name || '')
                 .replace(/{{education}}/g, data.education || '')
                 .replace(/{{skills}}/g, data.skills || '')
                 .replace(/{{experience}}/g, data.experience || '')
                 .replace(/{{job_role}}/g, data.jobRole || '')
                 .replace(/{{email}}/g, data.email || '')
                 .replace(/{{phone}}/g, data.phone || '')
                 .replace(/{{linkedin}}/g, data.linkedin || '')
                 .replace(/{{city}}/g, data.city || '')
                 .replace(/{{state}}/g, data.state || '')
                 .replace(/{{country}}/g, data.country || '')
                 .replace(/{{projects}}/g, data.projects || '')
                 .replace(/{{certificates}}/g, data.certificates || '')
                 .replace(/{{achievements}}/g, data.achievements || '')
                 .replace(/{{hobbies}}/g, data.hobbies || '');

  if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    return mockResumeGeneration(data);
  }

  try {
    const isOpenAI = !process.env.OPENROUTER_API_KEY && process.env.OPENAI_API_KEY;
    const options = {
      messages: [{ role: "system", content: "You are a helpful assistant that outputs only valid JSON." }, { role: "user", content: prompt }],
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
    };
    
    // Only add response_format if using OpenAI directly or if model is known to support it well
    if (isOpenAI || (process.env.AI_MODEL && process.env.AI_MODEL.includes('gpt'))) {
       options.response_format = { type: "json_object" };
    }

    const completion = await openai.chat.completions.create(options);
    let content = completion.choices[0].message.content;
    
    // Clean up markdown code blocks if present
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    return mockResumeGeneration(data);
  }
};

const analyzeResume = async (resumeText, jobDescription) => {
  let prompt = getPromptTemplate('resume_analyzer_prompt.txt');
  
  prompt = prompt.replace('{{resume_text}}', resumeText)
                 .replace('{{job_description}}', jobDescription || 'General Software Engineering Role');

  if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    return mockResumeAnalysis();
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
    });
    
    let content = completion.choices[0].message.content;
    
    // Clean up markdown code blocks if present
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return content;
  } catch (error) {
    console.error("OpenAI/OpenRouter API Error in analyzeResume:", error);
     if (error.response) {
        console.error("API Response Data:", error.response.data);
    }
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

const chatWithAI = async (message, context = []) => {
  if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    return "I am an AI assistant. Please configure the API key to chat with me.";
  }

  try {
    const messages = [
      { role: "system", content: "You are a helpful AI assistant for a Resume Builder application. Help the user with resume writing, career advice, and interview tips. Keep answers concise." },
      ...context,
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Chat Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};

module.exports = {
  generateResumeContent,
  analyzeResume,
  chatWithAI
};


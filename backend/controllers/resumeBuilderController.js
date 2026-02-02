const aiService = require('../services/aiService');
const PDFDocument = require('pdfkit');
const Resume = require('../models/Resume');
const fs = require('fs');
const pdf = require('pdf-parse-new');

exports.uploadContextDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      try {
        const data = await pdf(dataBuffer);
        extractedText = data.text;
      } catch (pdfError) {
         console.error("PDF Parsing Error:", pdfError);
         fs.unlinkSync(req.file.path);
         return res.status(400).json({ error: 'Failed to parse PDF file.' });
      }
    } else {
      // Assume text/plain
      extractedText = fs.readFileSync(req.file.path, 'utf8');
    }

    // Cleanup
    fs.unlinkSync(req.file.path);

    res.json({ text: extractedText, filename: req.file.originalname });
  } catch (error) {
    console.error("Error in uploadContextDocument:", error);
    res.status(500).json({ error: 'Failed to process document' });
  }
};

exports.chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;
    const response = await aiService.chatWithAI(message, context);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to chat with AI' });
  }
};

exports.generateResume = async (req, res) => {
  try {
    const { name, email, education, skills, experience, jobRole } = req.body;
    
    if (!name || !jobRole) {
      return res.status(400).json({ error: 'Name and Job Role are required' });
    }

    const generatedContent = await aiService.generateResumeContent({
      name, email, education, skills, experience, jobRole
    });

    // Save to Database
    await Resume.create({
      name,
      email,
      skills,
      experience,
      resume_text: generatedContent,
    });

    res.json({ content: generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
};

// --- PDF Render Helpers ---

const renderHeader = (doc, data, color, align = 'left', font = 'Helvetica-Bold') => {
  const { fullName, email, phone, linkedin, city, state, country, role } = data.personalInfo || {};
  const location = [city, state, country].filter(Boolean).join(', ');

  doc.font(font).fontSize(24).fillColor(color || '#000000').text(fullName || '', { align });
  
  if (role) {
    doc.fontSize(14).fillColor('#666666').text(role, { align });
  }
  
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor('#444444');
  
  const contactParts = [email, phone, linkedin, location].filter(Boolean);
  if (align === 'center') {
      doc.text(contactParts.join(' | '), { align });
  } else {
      contactParts.forEach(part => doc.text(part));
  }
  doc.moveDown(1);
};

const renderSectionTitle = (doc, title, color, style = 'classic') => {
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(14).fillColor(color || '#000000');
  
  if (style === 'classic' || style === 'professional') {
    doc.text(title.toUpperCase());
    doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).strokeColor(color || '#000000').lineWidth(1).stroke();
  } else if (style === 'modern') {
    doc.text(title.toUpperCase(), { align: 'center' });
  } else if (style === 'minimalist') {
    doc.text(title.toUpperCase());
    doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).strokeColor('#e5e7eb').lineWidth(0.5).stroke();
  } else if (style === 'tech') {
    doc.font('Courier-Bold').text(`> ${title.toUpperCase()}`);
  } else {
    doc.text(title.toUpperCase());
  }
  doc.moveDown(0.5);
};

const renderExperience = (doc, experience, color, style = 'classic') => {
  if (!experience || experience.length === 0) return;
  
  renderSectionTitle(doc, 'Experience', color, style);
  
  experience.forEach(exp => {
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000').text(exp.role);
    
    doc.fontSize(10).fillColor(color || '#666666');
    if (style === 'compact') {
        doc.text(`${exp.company} | ${exp.duration}`);
    } else {
        doc.text(exp.company);
        doc.fillColor('#888888').text(exp.duration, { align: 'right', continued: false });
        // doc.y -= 10; // Adjust for right align if needed, simpler to just print line
    }
    
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(10).fillColor('#333333').text(exp.description, { align: 'justify' });
    doc.moveDown(0.8);
  });
};

const renderProjects = (doc, projects, color, style = 'classic') => {
  if (!projects || projects.length === 0) return;
  
  renderSectionTitle(doc, 'Projects', color, style);
  
  projects.forEach(proj => {
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000').text(proj.title);
    if (proj.technologies) {
      doc.font('Helvetica-Oblique').fontSize(10).fillColor(color || '#666666').text(proj.technologies);
    }
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(10).fillColor('#333333').text(proj.description, { align: 'justify' });
    doc.moveDown(0.8);
  });
};

const renderEducation = (doc, education, color, style = 'classic') => {
  if (!education || education.length === 0) return;
  
  renderSectionTitle(doc, 'Education', color, style);
  
  education.forEach(edu => {
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000').text(edu.degree);
    doc.fontSize(10).fillColor('#555555').text(`${edu.school}, ${edu.year}`);
    doc.moveDown(0.5);
  });
};

const renderSkills = (doc, skills, color, style = 'classic') => {
  if (!skills || skills.length === 0) return;
  
  renderSectionTitle(doc, 'Skills', color, style);
  
  doc.font('Helvetica').fontSize(10).fillColor('#333333');
  // Clean up skills if they are strings
  const skillText = skills.join(' • ');
  doc.text(skillText);
  doc.moveDown(1);
};

const renderList = (doc, title, items, color, style = 'classic') => {
  if (!items || items.length === 0) return;
  renderSectionTitle(doc, title, color, style);
  items.forEach(item => {
    doc.font('Helvetica').fontSize(10).fillColor('#333333').text(`• ${item}`, { indent: 10 });
  });
  doc.moveDown(1);
};

// --- Template Specific Renders ---

const renderClassicTemplate = (doc, data, color) => {
  renderHeader(doc, data, color, 'left', 'Times-Bold');
  
  if (data.summary) {
    renderSectionTitle(doc, 'Summary', color, 'classic');
    doc.font('Times-Roman').fontSize(10).text(data.summary);
    doc.moveDown();
  }
  
  renderExperience(doc, data.experience, color, 'classic');
  renderProjects(doc, data.projects, color, 'classic');
  renderEducation(doc, data.education, color, 'classic');
  renderSkills(doc, data.skills, color, 'classic');
  renderList(doc, 'Certificates', data.certificates, color, 'classic');
  renderList(doc, 'Achievements', data.achievements, color, 'classic');
  renderList(doc, 'Hobbies', data.hobbies, color, 'classic');
};

const renderModernTemplate = (doc, data, color) => {
  renderHeader(doc, data, color, 'center', 'Helvetica-Bold');
  
  if (data.summary) {
    renderSectionTitle(doc, 'Professional Summary', color, 'modern');
    doc.font('Helvetica').fontSize(10).text(data.summary, { align: 'center' });
    doc.moveDown();
  }
  
  renderExperience(doc, data.experience, color, 'modern');
  renderProjects(doc, data.projects, color, 'modern');
  renderEducation(doc, data.education, color, 'modern');
  renderSkills(doc, data.skills, color, 'modern');
  renderList(doc, 'Certificates', data.certificates, color, 'modern');
};

const renderExecutiveTemplate = (doc, data, color) => {
  // Dark Header Background
  doc.rect(0, 0, 612, 140).fill(color || '#1e293b');
  
  // Header Text (White)
  const { fullName, role, email, phone, linkedin, city, country } = data.personalInfo || {};
  doc.fillColor('#FFFFFF').fontSize(26).font('Helvetica-Bold').text(fullName || '', 50, 40);
  if (role) doc.fontSize(16).fillColor('#cbd5e1').text(role, 50, 75);
  
  doc.fontSize(10).fillColor('#e2e8f0').text([email, phone, city, country].filter(Boolean).join(' | '), 50, 100);
  
  doc.y = 160; // Move below header
  doc.fillColor('#000000'); // Reset text color

  if (data.summary) {
    renderSectionTitle(doc, 'Summary', color, 'classic');
    doc.text(data.summary);
    doc.moveDown();
  }

  renderExperience(doc, data.experience, color, 'classic');
  renderProjects(doc, data.projects, color, 'classic');
  renderEducation(doc, data.education, color, 'classic');
  renderSkills(doc, data.skills, color, 'classic');
};

const renderTechTemplate = (doc, data, color) => {
  // Dark Background (simulated with dark rect if desired, but let's keep it white for print friendlyness, just dark headers)
  // Actually, user wanted "Tech" style. Let's use a monospaced font and maybe a dark sidebar or header.
  
  doc.rect(0, 0, 612, 800).fill('#111827'); // Full Dark Page
  doc.fillColor('#e5e7eb'); // Light text

  const { fullName, role } = data.personalInfo || {};
  
  doc.font('Courier-Bold').fontSize(28).fillColor(color || '#60a5fa').text(`> ${fullName}`, 50, 50);
  if (role) doc.fontSize(16).fillColor('#9ca3af').text(role, 50, 85);
  
  // Contact
  doc.fontSize(10).fillColor('#6b7280').text([data.personalInfo?.email, data.personalInfo?.phone].filter(Boolean).join(' // '), 50, 110);
  
  doc.moveDown(2);
  
  // Helper to render tech sections
  const renderTechSection = (title, items) => {
     if (!items) return;
     doc.font('Courier-Bold').fontSize(14).fillColor(color || '#60a5fa').text(`// ${title}`);
     doc.moveDown(0.5);
     doc.font('Courier').fontSize(10).fillColor('#d1d5db');
  };

  if (data.skills) {
      renderTechSection('SKILLS', null);
      doc.text(`[ ${data.skills.join(', ')} ]`);
      doc.moveDown();
  }
  
  if (data.experience) {
      renderTechSection('EXPERIENCE', null);
      data.experience.forEach(exp => {
          doc.fillColor('#ffffff').text(`const ${exp.company.replace(/\s/g,'_')} = {`);
          doc.indent(20).fillColor('#9ca3af').text(`role: "${exp.role}",`);
          doc.text(`duration: "${exp.duration}",`);
          doc.text(`description: "${exp.description}"`);
          doc.indent(-20).fillColor('#ffffff').text('};');
          doc.moveDown(0.5);
      });
      doc.moveDown();
  }

  if (data.projects) {
      renderTechSection('PROJECTS', null);
      data.projects.forEach(proj => {
          doc.fillColor('#ffffff').text(`function ${proj.title.replace(/\s/g,'_')}() {`);
          if (proj.technologies) doc.indent(20).fillColor('#60a5fa').text(`// Stack: ${proj.technologies}`);
          doc.indent(20).fillColor('#9ca3af').text(`return "${proj.description}";`);
          doc.indent(-20).fillColor('#ffffff').text('}');
          doc.moveDown(0.5);
      });
  }
};

const renderElegantTemplate = (doc, data, color) => {
  doc.font('Times-Roman');
  const { fullName, role } = data.personalInfo || {};
  
  // Center Header with decorative lines
  doc.fontSize(28).font('Times-Bold').fillColor(color || '#000000').text(fullName, { align: 'center' });
  if (role) doc.fontSize(14).font('Times-Italic').fillColor('#555555').text(role, { align: 'center' });
  
  doc.moveDown(0.5);
  doc.moveTo(100, doc.y).lineTo(512, doc.y).strokeColor(color || '#000000').lineWidth(0.5).stroke();
  doc.moveDown(0.5);
  
  // Contact
  const contact = [data.personalInfo?.email, data.personalInfo?.phone, data.personalInfo?.city].filter(Boolean).join('  •  ');
  doc.fontSize(10).font('Times-Roman').text(contact, { align: 'center' });
  doc.moveDown(2);

  const renderElegantSection = (title) => {
      doc.moveDown(0.5);
      doc.font('Times-Bold').fontSize(12).fillColor(color || '#000000').text(title.toUpperCase(), { align: 'center', characterSpacing: 2 });
      doc.moveDown(0.5);
  };

  if (data.summary) {
      doc.font('Times-Italic').fontSize(11).text(data.summary, { align: 'center' });
      doc.moveDown(2);
  }

  if (data.skills) {
      renderElegantSection('Core Competencies');
      doc.font('Times-Roman').fontSize(10).text(data.skills.join('  •  '), { align: 'center' });
      doc.moveDown(1);
  }

  if (data.experience) {
      renderElegantSection('Professional Experience');
      data.experience.forEach(exp => {
          doc.font('Times-Bold').fontSize(12).fillColor('#000000').text(exp.role, { continued: true });
          doc.font('Times-Italic').fillColor('#555555').text(`  ${exp.company}`, { align: 'right' }); 
          // Reset continued is tricky with align right, so we use a different approach for PDFKit:
          // Just print two lines or use specific x coordinates if needed. 
          // For simplicity in this text flow:
          doc.text('', { continued: false }); 
          
          doc.font('Times-Roman').fontSize(10).text(exp.description, { align: 'justify' });
          doc.moveDown(1);
      });
  }
  
  if (data.education) {
      renderElegantSection('Education');
      data.education.forEach(edu => {
          doc.font('Times-Bold').fontSize(11).text(edu.degree, { align: 'center' });
          doc.font('Times-Roman').fontSize(10).text(`${edu.school}, ${edu.year}`, { align: 'center' });
          doc.moveDown(0.5);
      });
  }
};

const renderCompactTemplate = (doc, data, color) => {
  // Compact: Two columns logic is hard with simple flow, so we use a tight one-column or simplified layout
  // Let's do a very clean, tight left-aligned layout with small fonts
  
  const { fullName, role, email, phone, linkedin, city } = data.personalInfo || {};
  
  // Header in one line
  doc.font('Helvetica-Bold').fontSize(22).fillColor(color || '#000000').text(fullName, { continued: true });
  doc.fontSize(12).fillColor('#666666').text(`  |  ${role || ''}`, { align: 'right' });
  
  doc.fontSize(9).fillColor('#444444').text([email, phone, linkedin, city].filter(Boolean).join(' • '));
  doc.moveTo(doc.x, doc.y + 5).lineTo(550, doc.y + 5).strokeColor(color || '#000000').lineWidth(2).stroke();
  doc.moveDown(1);

  // Columns Helper (Fake columns by indenting?)
  // PDFKit supports columns but it's complex for dynamic height. 
  // We'll stick to a dense vertical layout.

  if (data.skills) {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(color || '#000000').text('SKILLS: ', { continued: true });
      doc.font('Helvetica').fillColor('#000000').text(data.skills.join(', '));
      doc.moveDown(0.5);
  }

  if (data.summary) {
      doc.font('Helvetica').fontSize(9).text(data.summary);
      doc.moveDown(0.5);
  }
  
  const renderCompactSection = (title) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(color || '#000000').text(title.toUpperCase());
      doc.moveTo(doc.x, doc.y).lineTo(200, doc.y).strokeColor('#cccccc').lineWidth(0.5).stroke();
      doc.moveDown(0.2);
  };

  if (data.experience) {
      renderCompactSection('Experience');
      data.experience.forEach(exp => {
          doc.font('Helvetica-Bold').fontSize(10).text(exp.role, { continued: true });
          doc.font('Helvetica').fontSize(9).text(` at ${exp.company} (${exp.duration})`);
          doc.fontSize(9).text(exp.description);
          doc.moveDown(0.3);
      });
      doc.moveDown(0.5);
  }
  
  if (data.projects) {
      renderCompactSection('Projects');
      data.projects.forEach(proj => {
          doc.font('Helvetica-Bold').fontSize(10).text(proj.title);
          doc.fontSize(9).text(proj.description);
          doc.moveDown(0.3);
      });
      doc.moveDown(0.5);
  }
  
  if (data.education) {
      renderCompactSection('Education');
      data.education.forEach(edu => {
          doc.fontSize(9).text(`${edu.degree}, ${edu.school} (${edu.year})`);
      });
  }
};


exports.downloadResumePDF = (req, res) => {
  const { content, template, color } = req.body;
  
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=resume-${template}.pdf`);

  doc.pipe(res);
  
  let data = content;
  if (typeof content === 'string') {
      try {
          data = JSON.parse(content);
      } catch (e) {
          // Fallback if not JSON
          doc.text(content);
          doc.end();
          return;
      }
  }

  // normalize data fields if they are strings (JSON from AI sometimes gives strings for lists)
  // But our frontend sends structured objects now usually? 
  // Wait, the frontend sends `resumeContent` which IS a JSON string usually.
  
  // Normalize arrays if they are strings
  // (Helper function to ensure array)
  const ensureArray = (item) => Array.isArray(item) ? item : (item ? [item] : []);
  
  data.skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s=>s.trim()) : []);
  // Experience, Education, Projects are usually arrays in the JSON structure from AI

  const accentColor = color || '#2563eb';

  switch (template) {
    case 'modern':
      renderModernTemplate(doc, data, accentColor);
      break;
    case 'executive':
      renderExecutiveTemplate(doc, data, accentColor);
      break;
    case 'tech':
      renderTechTemplate(doc, data, accentColor);
      break;
    case 'elegant':
      renderElegantTemplate(doc, data, accentColor);
      break;
    case 'compact':
      renderCompactTemplate(doc, data, accentColor);
      break;
    case 'creative':
       // Reuse Modern for now with pink default
       renderModernTemplate(doc, data, color || '#db2777');
       break;
    case 'professional':
       // Reuse Classic with teal default
       renderClassicTemplate(doc, data, color || '#0f766e');
       break;
    case 'minimalist':
       // Reuse Classic with gray default
       renderClassicTemplate(doc, data, color || '#374151');
       break;
    case 'classic':
    default:
      renderClassicTemplate(doc, data, accentColor);
      break;
  }

  doc.end();
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Resume.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['id', 'name', 'created_at'] 
    });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

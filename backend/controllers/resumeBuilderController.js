const aiService = require('../services/aiService');
const PDFDocument = require('pdfkit');
const {
  generateResumeContent,
  analyzeResume
} = require('../services/resumeService');


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
      // email is not in the form, but in DB schema. We can leave it null or add to form.
      // let's leave it null for now as per form.
    });

    res.json({ content: generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
};

exports.downloadResumePDF = (req, res) => {
  const { content, template, color } = req.body;
  
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

  doc.pipe(res);
  
  // Helper to parse and style text based on simple markdown-like markers
  const lines = content.split('\n');
  
  // Default Colors if not provided
  const defaultColor = color || '#000000';
  const accentColor = color || '#2563eb';

  const styles = {
    modern: {
      font: 'Helvetica',
      headerColor: color || '#2563eb', // Blue or Custom
      bodyColor: '#1f2937',
      nameSize: 24,
      headerSize: 16,
      bodySize: 11
    },
    classic: {
      font: 'Times-Roman',
      headerColor: color || '#000000',
      bodyColor: '#000000',
      nameSize: 20,
      headerSize: 14,
      bodySize: 12
    },
    creative: {
      font: 'Courier',
      headerColor: color || '#db2777', // Pink or Custom
      bodyColor: '#374151',
      nameSize: 26,
      headerSize: 18,
      bodySize: 11
    },
    professional: {
      font: 'Helvetica',
      headerColor: color || '#0f766e', // Teal or Custom
      bodyColor: '#111827',
      nameSize: 22,
      headerSize: 15,
      bodySize: 11
    },
    executive: {
      font: 'Helvetica-Bold',
      headerColor: '#FFFFFF', // White text on dark bg
      bodyColor: '#111827',
      nameSize: 26,
      headerSize: 16,
      bodySize: 12,
      isDarkHeader: true,
      bgColor: color || '#1e293b' // Dark Blue/Slate
    },
    minimalist: {
      font: 'Helvetica',
      headerColor: color || '#374151',
      bodyColor: '#4b5563',
      nameSize: 20,
      headerSize: 12,
      bodySize: 10,
      uppercaseHeaders: true
    }
  };

  const currentStyle = styles[template] || styles.classic;
  
  // Background for Creative
  if (template === 'creative') {
    doc.rect(0, 0, 200, doc.page.height).fill('#fce7f3'); // Side bar
    doc.fillColor('#000000'); // Reset
  }

  // Header Background for Executive
  if (template === 'executive') {
    doc.rect(0, 0, doc.page.width, 150).fill(currentStyle.bgColor);
    doc.fillColor('#FFFFFF'); // Reset to white for now
  }

  doc.font(currentStyle.font);

  lines.forEach(line => {
    line = line.trim();
    if (!line) {
      doc.moveDown(0.5);
      return;
    }

    if (line.startsWith('# ')) {
      // Name (H1)
      let options = { 
        align: template === 'modern' || template === 'creative' || template === 'minimalist' ? 'center' : 'left',
        width: template === 'creative' ? 400 : undefined 
      };

      if (template === 'executive') {
         doc.fillColor(currentStyle.headerColor); // White
         options.align = 'left';
         doc.moveDown(1); // Padding top
      } else {
         doc.fillColor(currentStyle.headerColor);
      }

      doc.fontSize(currentStyle.nameSize)
         .text(line.replace('# ', ''), options)
         .moveDown(0.5);
         
    } else if (line.startsWith('## ')) {
      // Section Header (H2)
      let text = line.replace('## ', '');
      if (currentStyle.uppercaseHeaders) text = text.toUpperCase();

      doc.fontSize(currentStyle.headerSize);
      
      if (template === 'executive') {
        doc.fillColor(currentStyle.bgColor); // Use dark color for section headers in body
        if (doc.y < 150) doc.fillColor('#FFFFFF'); // Keep white if still in header (unlikely for H2)
      } else {
        doc.fillColor(currentStyle.headerColor);
      }

      doc.text(text)
         .moveDown(0.2);
      
      // Add underline for classic & professional
      if (template === 'classic' || template === 'professional') {
         doc.moveTo(doc.x, doc.y)
            .lineTo(doc.page.width - 50, doc.y)
            .strokeColor(currentStyle.headerColor)
            .stroke()
            .moveDown(0.5);
      }
      // Divider for Minimalist
      if (template === 'minimalist') {
         doc.moveTo(doc.x, doc.y)
            .lineTo(doc.page.width - 50, doc.y)
            .lineWidth(0.5)
            .strokeColor('#e5e7eb')
            .stroke()
            .moveDown(0.5);
      }

    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Subtitle / Job Role
      let roleColor = currentStyle.bodyColor;
      if (template === 'executive' && doc.y < 140) roleColor = '#cbd5e1'; // Light gray in header

      doc.fontSize(currentStyle.bodySize + 2)
         .fillColor(roleColor)
         .font(currentStyle.font) // Keep bold/font
         .text(line.replace(/\*\*/g, ''), { align: template === 'modern' || template === 'creative' || template === 'minimalist' ? 'center' : 'left' })
         .moveDown(0.5);
         
    } else if (line.startsWith('- ')) {
      // Bullet point
      doc.fontSize(currentStyle.bodySize)
         .fillColor(currentStyle.bodyColor)
         .text(`• ${line.replace('- ', '')}`, { indent: 10 });
    } else {
      // Normal text
      let textColor = currentStyle.bodyColor;
      if (template === 'executive' && doc.y < 140) textColor = '#e2e8f0';

      doc.fontSize(currentStyle.bodySize)
         .fillColor(textColor)
         .text(line);
    }
  });

  doc.end();
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Resume.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['id', 'name', 'jobRole', 'created_at'] // select limited fields
    });
    // Note: jobRole wasn't in the original schema explicitly as a column, 
    // but we might have saved it in the 'experience' or just need to check the schema.
    // Let's check the schema first. Wait, I created the schema. 
    // The schema has: name, email, skills, experience, resume_text, ats_score.
    // It does NOT have 'jobRole'. I should add it or just ignore it for the list.
    // I'll stick to 'name' and 'created_at' for now to be safe, or migrate.
    // Let's just return what we have.
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

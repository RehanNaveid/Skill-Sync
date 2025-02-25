const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const pdfParse = require('pdf-parse');
const User = require('../models/User'); // Use User instead of Resume

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    const buffer = await fs.readFile(filePath);
    const pdfText = (await pdfParse(buffer)).text;

    // Extract skills using regex (modify as needed)
    const skillsRegex = /\b(JavaScript|Python|Java|C\+\+|React|Node\.js|MongoDB|AWS|Flutter|Firebase|Git|SQL)\b/gi;
    const extractedSkills = [...new Set(pdfText.match(skillsRegex) || [])];

    const username = "RehanNaveid"; // Change this manually

    if (!extractedSkills.length) {
      return res.status(400).json({ error: "No skills found in resume" });
    }

    // Store extracted skills in User.js instead of Resume.js
    await User.findOneAndUpdate(
      { username },
      { $set: { resumeSkills: extractedSkills } },
      { upsert: true, new: true }
    );

    await fs.remove(filePath);

    res.status(200).json({ 
      message: 'Resume parsed successfully', 
      username, 
      skills: extractedSkills 
    });

  } catch (err) {
    res.status(500).json({ error: 'Resume parsing failed', details: err.message });
  }
});

module.exports = router;

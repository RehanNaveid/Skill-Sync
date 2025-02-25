const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  filename: String,
  skills: [String],  // Extracted skills from resume
  username: { type: String, required: true }, // Added username field
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);

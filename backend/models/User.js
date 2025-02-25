// const mongoose = require('mongoose');

  
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   githubId: { type: String },
//   profileUrl: { type: String },
//   resumeSkills: [String],   // Extracted from Resume Parsing
//   githubSkills: [String],   // Extracted from GitHub API
//   commonSkills: [String],   // Intersection of Resume & GitHub Skills
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  githubId: { type: String },
  profileUrl: { type: String },
  resumeSkills: [String],   // Extracted from Resume Parsing
  githubSkills: [String],   // Extracted from GitHub API
  commonSkills: [String],   // Intersection of Resume & GitHub Skills
  skillGraph: {             // Skill Passport tracking skill level
    type: Map,
    of: String,             // Levels: Beginner, Intermediate, Advanced
  }
});

module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // userSchema.pre('save', async function (next) {
// //   if (this.isModified('password')) {
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }
// //   next();
// // });

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   skills: { type: [String], default: [] },
// });

// module.exports = mongoose.model('User', userSchema);
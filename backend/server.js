const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');
const resumeRoutes = require('./routes/resumeRoutes'); // Include resume parsing routes
const passport = require('passport');
const matchTaskRoutes = require('./routes/match-task');
require('./config/passport'); // Load GitHub OAuth config



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.send('Welcome to the Skill Sync API 🚀');
  });

// Routes
app.use('/api', githubRoutes);
app.use('/api', resumeRoutes); // Add resume parsing route
app.use('/match-task', matchTaskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));

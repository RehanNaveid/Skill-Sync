const express = require('express');
const User = require('../models/User');
const { calculateMatchScore } = require('../services/taskMatching');

const router = express.Router();

// ✅ Debugging Log
console.log("✅ taskMatching.js route file loaded");

// ✅ Sample Company Task
const sampleTask = {
  taskId: "ML_Startup_001",
  title: "Build a Sentiment Analysis Model",
  requiredSkills: ["Python", "Machine Learning", "NLP", "TensorFlow", "Deep Learning"],
  difficulty: "Intermediate"
};

router.get('/:username', async (req, res) => {
    console.log(`✅ Route Hit: /match-task/${req.params.username}`); // Debug log

    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.githubSkills && !user.resumeSkills) {
            return res.status(400).json({ error: "User skills not found" });
        }

        // ✅ Merge all available skills
        const allUserSkills = [...new Set([...user.githubSkills, ...user.resumeSkills, ...user.commonSkills])];
        console.log(`✅ User Skills:`, allUserSkills);

        // ✅ Calculate Match Score
        const matchResult = calculateMatchScore(allUserSkills, sampleTask.requiredSkills);

        res.status(200).json({
            message: `Task Matching for ${user.username}`,
            task: sampleTask.title,
            score: matchResult.score,
            matchedSkills: matchResult.matchedSkills,
            matchPercentage: matchResult.matchPercentage,
            suitability: matchResult.suitability
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

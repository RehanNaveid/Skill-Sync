const express = require('express');
const { fetchGitHubRepos, analyzeGitHubRepos } = require('../services/githubService');
const { compareSkills } = require('../services/skillComparison');
const User = require('../models/User');

const router = express.Router();

router.get('/github-skills/:username', async (req, res) => {
    try {
        const repos = await fetchGitHubRepos(req.params.username);
        const githubSkills = analyzeGitHubRepos(repos);

        let user = await User.findOne({ username: req.params.username });

        if (!user || !user.resumeSkills) {
            return res.status(400).json({ error: 'No resume skills found for this user' });
        }

        // ✅ Compute common skills dynamically
        const commonSkills = user.resumeSkills.filter(skill => githubSkills.includes(skill));

        // ✅ Count skill frequencies (Resume + GitHub)
        let skillFrequency = {};
        [...user.resumeSkills, ...githubSkills].forEach(skill => {
            skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
        });

        // ✅ Assign skill levels
        let skillGraph = {};
        Object.entries(skillFrequency).forEach(([skill, count]) => {
            if (count >= 0 && count <=1) {
                skillGraph[skill] = 'Beginner';
            } else if (count >= 2 && count <= 5) {
                skillGraph[skill] = 'Intermediate';
            } else {
                skillGraph[skill] = 'Advanced';
            }
        });

        // ✅ Debugging logs
        console.log('📌 Skill Frequencies:', JSON.stringify(skillFrequency, null, 2));
        console.log('📌 Skill Graph:', JSON.stringify(skillGraph, null, 2));

        // ✅ Update MongoDB with new skill data
        user.githubSkills = githubSkills;
        user.commonSkills = commonSkills;
        user.skillGraph = skillGraph; // Store skill graph in DB
        await user.save();

        res.status(200).json({
            message: 'GitHub skills compared successfully',
            commonSkills,
            skillGraph,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

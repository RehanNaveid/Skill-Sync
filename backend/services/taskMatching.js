// taskMatching.js - Handles skill-task matching logic

function calculateMatchScore(userSkills, requiredSkills) {
    let score = 0;
    let matchedSkills = [];
  
    requiredSkills.forEach(skill => {
      if (userSkills.includes(skill)) {
        score += 10; // ✅ Exact match → +10 points
        matchedSkills.push(skill);
      }
    });
  
    let matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
    let suitability = matchPercentage >= 70 ? "Highly Suitable"
                    : matchPercentage >= 40 ? "Moderate Fit"
                    : "Not Recommended";
  
    return { score, matchedSkills, matchPercentage, suitability };
  }
  
  module.exports = { calculateMatchScore };
  
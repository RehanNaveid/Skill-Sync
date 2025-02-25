const compareSkills = (resumeSkills, githubSkills) => {
    const commonSkills = resumeSkills.filter(skill => githubSkills.includes(skill));
    return {
      resumeSkills,
      githubSkills,
      commonSkills,
    };
  };
  
  module.exports = { compareSkills };
  
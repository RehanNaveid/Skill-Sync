const axios = require('axios');

const fetchGitHubRepos = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch GitHub repositories');
  }
};

// Verify if the repo has significant contributions
const verifyRepository = (repo) => {
  return repo.forks_count > 5 || repo.stargazers_count > 10 || repo.watchers_count > 5;
};

function analyzeGitHubRepos(repos) {
    console.log('Analyzing GitHub Repos:', repos); // Debugging
  
    const skills = new Set();
  
    repos.forEach(repo => {
      console.log(`Repo: ${repo.name}, Language: ${repo.language}`); // Debug
  
      if (repo.language) skills.add(repo.language);
    });
  
    console.log('Extracted GitHub Skills:', Array.from(skills)); // Debugging
    return Array.from(skills);
    }

// const axios = require('axios');

// const GITHUB_API_URL = 'https://api.github.com';

// async function fetchGitHubRepoDetails(username) {
//     try {
//         const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching GitHub repos:', error);
//         return [];
//     }
// }

// async function analyzeRepoAuthenticity(repo) {
//     try {
//         const response = await axios.get(repo.url);
//         const data = response.data;

//         let score = 0;

//         if (data.stargazers_count > 10) score += 2;
//         if (data.forks_count > 5) score += 2;
//         if (data.open_issues_count < 10) score += 1;
//         if (!data.fork) score += 3; // Original repo gets higher score

//         const contributorsResponse = await axios.get(data.contributors_url);
//         if (contributorsResponse.data.length > 2) score += 2;

//         return { repoName: data.name, score };
//     } catch (error) {
//         console.error('Error analyzing repo authenticity:', error);
//         return { repoName: repo.name, score: 0 };
//     }
// }

// async function getVerifiedRepos(username) {
//     const repos = await fetchGitHubRepoDetails(username);
//     const verifiedRepos = await Promise.all(repos.map(analyzeRepoAuthenticity));
//     return verifiedRepos;
// }

// module.exports = { getVerifiedRepos };


// // const analyzeGitHubRepos = (repos) => {
// //   const verifiedSkills = new Set();

// //   repos.forEach((repo) => {
// //     if (repo.language && verifyRepository(repo)) {
// //       verifiedSkills.add(repo.language);
// //     }
// //   });

// //   return Array.from(verifiedSkills);
// // };

module.exports = { fetchGitHubRepos, analyzeGitHubRepos };

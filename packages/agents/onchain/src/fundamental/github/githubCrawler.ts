import { Octokit } from "@octokit/rest";
import { config } from "../../config";


export const fetchGitHubRepoStats = async (repoUrl: string) => {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  const octokit = new Octokit({ auth: config.githubToken });

  // Get repo metadata
  const repoData = await octokit.rest.repos.get({ owner, repo });
  const contributorsData = await octokit.rest.repos.listContributors({ owner, repo });
  const commitsData = await octokit.rest.repos.listCommits({ owner, repo, per_page: 1 });

  return {
    repoUrl,
    stars: repoData.data.stargazers_count,
    commits: repoData.data.commits_url ? repoData.data.open_issues_count : 0, // fallback
    contributors: contributorsData.data.length,
    recentActivity: commitsData.data[0]?.commit?.committer?.date || "Unknown"
  };
};

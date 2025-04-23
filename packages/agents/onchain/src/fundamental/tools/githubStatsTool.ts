import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config, validateConfig } from "../../config";

// Schema for GitHub Analysis Input
const schema = z.object({
  repoUrl: z.string().describe("GitHub repo URL to analyze"),
  stars: z.number().describe("Number of stars"),
  commits: z.number().describe("Number of commits"),
  contributors: z.number().describe("Number of contributors"),
  recentActivity: z.string().describe("Recent activity in the repo"),
});

// Initialize the LLM with the API key from the config
const llm = new ChatOpenAI({ 
    model: "gpt-4o-mini",
    openAIApiKey: config.openaiKey,
 });

// GitHub analysis prompt
const getGitHubStatsTool = () =>
  new DynamicStructuredTool({
    name: "analyze_github_activity",
    description: "Analyze GitHub activity and score the repo based on stars, commits, community, and dev activity",
    schema,
    func: async ({ repoUrl, stars, commits, contributors, recentActivity }) => {
      const prompt = `You're an open source codebase analyst.
      Here are GitHub stats:
      - Stars: ${stars}
      - Commits: ${commits}
      - Contributors: ${contributors}
      - Recent Activity: ${recentActivity}
      Analyze the GitHub repository at ${repoUrl} and return a JSON like:
      {
      stars: number,
      commits: number,
      contributors: number,
      recentActivity: string,
      score: number (1-3 based on activity and health),
      analysis: string (detailed analysis of the repo)
        
      }`;

      const res = await llm.invoke(prompt);
      return res;
    },
  });

export default getGitHubStatsTool;
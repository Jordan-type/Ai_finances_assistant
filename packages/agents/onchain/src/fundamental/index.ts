import getGitHubStatsTool from "./tools/githubStatsTool";
import getTokenomicsTool from "./tools/tokenomicsTool";
import getGovernanceTool from "./tools/governanceTool";
import { fetchGitHubRepoStats } from "./github/githubCrawler";


export const analyzeFundamentals = async (inputs: {
  repoUrl: string;
  tokenomicsSummary: string;
  governanceDoc: string;
}) => {
    // instantiate tools
    const githubTool = getGitHubStatsTool();
    const tokenomicsTool = getTokenomicsTool();
    const governanceTool = getGovernanceTool();

  // Fetch GitHub repo stats
  const githubMetadata = await fetchGitHubRepoStats(inputs.repoUrl);
  console.log("🔍 GitHub Metadata:", githubMetadata);

  // Validate inputs
  const githubAnalysis = await githubTool.invoke(githubMetadata);
  const tokenomicsAnalysis = await tokenomicsTool.invoke({ tokenData: inputs.tokenomicsSummary });
  const governanceAnalysis = await governanceTool.invoke({ forumSummary: inputs.governanceDoc });

  console.log("🔍 GitHub Output:", githubAnalysis);
  console.log("🔍 Tokenomics Output:", tokenomicsAnalysis);
  console.log("🔍 Governance Output:", governanceAnalysis);


  // Dummy score extractor — you can parse real scores from responses
  const getScore = (output: any): number => {
    // Handle output if it's an object (ChatResult or LLMResult or plain JSON string)
    let text: string;
  
    if (typeof output === "string") {
      text = output;
    } else if ("content" in output) {
      text = output.content; // from ChatMessage
    } else if ("text" in output) {
      text = output.text; // fallback
    } else {
      text = JSON.stringify(output); // last resort
    }
  
    const match = text.match(/score.*?(\d+)/i);
    return match ? parseInt(match[1], 10) : 2;
  };
  

  const githubScore = getScore(githubAnalysis);
  const tokenomicsScore = getScore(tokenomicsAnalysis);
  const governanceScore = getScore(governanceAnalysis);

  const total = githubScore + tokenomicsScore + governanceScore;
  const signal = total >= 10 ? "BUY" : total >= 6 ? "HOLD" : "SELL";

  return {
    signal,
    github: githubAnalysis,
    tokenomics: tokenomicsAnalysis,
    governance: governanceAnalysis,
    score: { githubScore, tokenomicsScore, governanceScore, total }
  };
};

import getSentimentTool from "./tools/sentimentTool";
import getVCFundingTool from "./tools/vcFundingTool";

export interface AnalyzeSentimentInput {
  twitterPosts: string;
  redditPosts: string;
  telegramChat: string;
  farcasterPosts: string;
  newsSummary: string;
}

export const analyzeSentiment = async ({
  twitterPosts,
  redditPosts,
  telegramChat,
  farcasterPosts,
  newsSummary,
}: AnalyzeSentimentInput) => {
  const sentimentTool = getSentimentTool();
  const vcTool = getVCFundingTool();

  const results = await Promise.all([
    sentimentTool.invoke({ platform: "twitter", dataSummary: twitterPosts }),
    sentimentTool.invoke({ platform: "reddit", dataSummary: redditPosts }),
    sentimentTool.invoke({ platform: "telegram", dataSummary: telegramChat }),
    sentimentTool.invoke({ platform: "farcaster", dataSummary: farcasterPosts }),
    vcTool.invoke({ newsSummary }),
  ]);

  const platforms = [
    { platform: "twitter", result: results[0] },
    { platform: "reddit", result: results[1] },
    { platform: "telegram", result: results[2] },
    { platform: "farcaster", result: results[3] },
    { platform: "news", result: results[4] }, // VC funding sentiment treated as 'news'
  ];

  // Score extraction logic
  const extractScore = (output: any) => {
    if (typeof output === "string") {
      const match = output.match(/score.*?(\d+)/i);
      return match ? parseInt(match[1], 10) : 2;
    }
    if ("content" in output) {
      const match = output.content.match(/score.*?(\d+)/i);
      return match ? parseInt(match[1], 10) : 2;
    }
    return 2; // default neutral
  };

  const totalScore = platforms.reduce((sum, item) => sum + extractScore(item.result), 0);
  const averageScore = totalScore / platforms.length;

  let signal = "HOLD";
  if (averageScore >= 2.5) signal = "BUY";
  else if (averageScore < 1.8) signal = "SELL";

  return {
    signal,
    platforms,
    score: {
      twitter: extractScore(results[0]),
      reddit: extractScore(results[1]),
      telegram: extractScore(results[2]),
      farcaster: extractScore(results[3]),
      vc_news: extractScore(results[4]),
      total: totalScore,
      average: averageScore.toFixed(2),
    },
  };
};

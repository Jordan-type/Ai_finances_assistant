import { analyzeSentiment } from "../sentiment/index";

(async () => {
  const result = await analyzeSentiment({
    twitterPosts: "People on Twitter are hyped about the new token release. Lots of bullish sentiment!",
    redditPosts: "Reddit threads are mixed — some believe the project is overhyped, others think it's undervalued.",
    telegramChat: "Telegram groups show cautious optimism with frequent mentions of potential airdrops.",
    farcasterPosts: "Farcaster users seem skeptical. They cite lack of transparency in the dev team.",
    newsSummary: "Crypto news outlets report significant VC investment in the project, hinting at long-term viability.",
  });

  console.log("📊 Sentiment Analysis Result:");
  console.dir(result, { depth: null });
})();

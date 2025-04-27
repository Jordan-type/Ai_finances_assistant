import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config } from "../../config";

// Define schema for sentiment input
const schema = z.object({
    platform: z.enum(["twitter", "reddit", "telegram", "farcaster", "news"]),
    dataSummary: z.string().describe("Summarized content/posts from the platform"),
});

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: config.openaiKey,
});

// LangChain tool for sentiment analysis
const getSentimentTool = () =>
  new DynamicStructuredTool({
    name: "analyze_sentiment",
    description: "Analyzes crypto community sentiment from social data (Twitter, Reddit, News, Telegram, Farcaster)",
    schema,
    func: async ({ platform, dataSummary }) => {


      const prompt = `
      You are a crypto sentiment analyst. Analyze the sentiment from the ${platform} summary below.
      DATA: ${dataSummary} Return a JSON with:
      {
       "sentiment": "positive" | "neutral" | "negative",
       "score": number (1-3),
       "summary": string (short summary of why you gave this score)
      }`;

      return await llm.invoke(prompt);
    },
  });

export default getSentimentTool;

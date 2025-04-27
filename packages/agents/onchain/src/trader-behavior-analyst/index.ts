import { z } from "zod"
import { ChatOpenAI } from "@langchain/openai"
import { DynamicStructuredTool } from "@langchain/core/tools"
import { config, validateConfig } from "../config";

const schema = z.object({
  clusterSummary: z.string().describe("Summarized transaction behavior of a wallet cluster"),
})

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    openAIApiKey: config.openaiKey,
  });

export const getTraderBehaviorAgent = () =>
  new DynamicStructuredTool({
    name: "analyze_trader_behavior",
    description: "Analyzes wallet cluster transaction summaries to generate behavior signals.",
    schema,
    func: async ({ clusterSummary }) => {
      const model = new ChatOpenAI({ model: "gpt-4o-mini" })

      const prompt = `
You are a crypto behavioral analyst. Analyze the following wallet cluster activity summary and return the result as structured JSON:

${clusterSummary}

Return format:
{
  "walletCluster": "Whales",
  "activityLevel": "High",
  "behaviorPattern": "Accumulation" | "Distribution" | "Sidelined",
  "signal": "BUY" | "SELL" | "HOLD",
  "confidence": "High" | "Medium" | "Low",
  "notes": "Short summary of why this behavior was identified.",
  "timestamp": "<UTC timestamp>"
}
`

      return await model.invoke(prompt)
    },
  })

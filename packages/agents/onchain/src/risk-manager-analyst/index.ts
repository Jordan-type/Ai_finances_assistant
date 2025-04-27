
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config, validateConfig } from "../config";

export const schema = z.object({
  quantScore: z.number().min(1).max(3),
  sentimentScore: z.number().min(1).max(3),
  fundamentalScore: z.number().min(1).max(3),
  traderBehaviorSignal: z.enum(["BUY", "SELL", "HOLD"]),
});

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: config.openaiKey,
});

export const getRiskManagerAgent = () =>
  new DynamicStructuredTool({
    name: "risk_manager_agent",
    description: "Analyzes input scores from other AI agents and outputs portfolio risk insights.",
    schema,
    func: async ({
      quantScore,
      sentimentScore,
      fundamentalScore,
      traderBehaviorSignal,
    }) => {


      const prompt = `
You are a crypto risk analyst for an AI-driven hedge fund. Given the following agent scores:

- Quant Score: ${quantScore}
- Sentiment Score: ${sentimentScore}
- Fundamental Score: ${fundamentalScore}
- Trader Behavior Signal: ${traderBehaviorSignal}

Evaluate the portfolio risk and return a JSON like:

{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "riskScore": number, // 0–10
  "recommendation": string
}

Focus on clarity and conservative analysis.`.trim();

      return await llm.invoke(prompt);
    },
  });

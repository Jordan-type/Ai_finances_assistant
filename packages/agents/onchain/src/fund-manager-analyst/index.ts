
  import { z } from "zod";
  import { ChatOpenAI } from "@langchain/openai";
  import { DynamicStructuredTool } from "@langchain/core/tools";
  import { config } from "../config";

  export const schema = z.object({
    riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
    goal: z.string().describe("The investor's objective, e.g. capital preservation, growth, income."),
  });

  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    openAIApiKey: config.openaiKey,
  });

  export const getFundManagerAgent = () =>
    new DynamicStructuredTool({
      name: "fund_manager_agent",
      description: "Suggests crypto portfolio allocations based on the risk level and investment goal.",
      schema,
      func: async ({ riskLevel, goal }) => {
        const prompt = `
You are a crypto fund manager AI.

Based on the following:
- Risk Level: ${riskLevel}
- Investment Goal: ${goal}

Choose a strategy: Conservative | Balanced | Aggressive

Then allocate across 3 asset categories:
- BTC
- Stablecoins
- DeFi Tokens

Return JSON like:

{
  "strategy": "Balanced",
  "goal": "...",
  "allocations": {
    "BTC": {
      "percentage": 40,
      "reason": "..."
    },
    "Stablecoins": {
      "percentage": 30,
      "reason": "..."
    },
    "DeFi Tokens": {
      "percentage": 30,
      "reason": "..."
    }
  },
  "note": "Optional recommendation or caution."
}
        `.trim();

        return await llm.invoke(prompt);
      },
    });

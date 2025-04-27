import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config } from "../../config";

// Schema for VC news analysis input
const schema = z.object({
  newsSummary: z.string().describe("A brief news summary or headline mentioning VC funding."),
});

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: config.openaiKey,
});

const getVCFundingTool = () =>
  new DynamicStructuredTool({
    name: "analyze_vc_funding",
    description: "Extract VC funders, investment stage, funding amount, and sentiment score from news summaries.",
    schema,
    func: async ({ newsSummary }) => {

      const prompt = `You are a venture capital analyst. Given the following VC-related news summary:
"${newsSummary}"

Return JSON like:
{
  "backers": ["a16z", "Coinbase Ventures"],
  "amount": "$25M",
  "stage": "Series A",
  "sentiment": "positive",
  "score": 3,
  "summary": "High-profile backing and growth signals a strong outlook."
}`;

      return await llm.invoke(prompt);
    },
  });

export default getVCFundingTool;

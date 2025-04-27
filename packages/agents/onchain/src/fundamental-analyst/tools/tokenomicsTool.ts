import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config, validateConfig } from "../../config";

const schema = z.object({
    tokenData: z.string().describe("Describe the tokenomics of the project"),
  });

  const llm = new ChatOpenAI({ 
    model: "gpt-4o-mini",
    openAIApiKey: config.openaiKey,
});
  
  const getTokenomicsTool = () =>
    new DynamicStructuredTool({
      name: "analyze_tokenomics",
      description: "Interpret tokenomics and rate quality and sustainability",
      schema,
      func: async ({ tokenData }) => {

        const prompt = `
  You're a tokenomics analyst.
  
  Interpret the following tokenomics details:
  ${tokenData}
  
  Return JSON:
  {
    inflation: string,
    tokenDistribution: string,
    vesting: string,
    score: number (1-3 based on quality and sustainability)
  }`;
  
        const res = await llm.invoke(prompt);
        return res;
      },
    });
  
  export default getTokenomicsTool;
  
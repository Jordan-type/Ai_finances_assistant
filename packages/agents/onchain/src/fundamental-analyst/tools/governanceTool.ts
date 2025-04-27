import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { config, validateConfig } from "../../config";

const schema = z.object({
    forumSummary: z.string().describe("Summarized governance forum and participation insights"),
  });

  // Initialize the LLM with the API key from the config
  const llm = new ChatOpenAI({ 
      model: "gpt-4o-mini",
      openAIApiKey: config.openaiKey,
   });
  
  const getGovernanceTool = () =>
    new DynamicStructuredTool({
      name: "analyze_governance",
      description: "Analyze project governance structure, voting stats, and audits",
      schema,
      func: async ({ forumSummary }) => {
        const prompt = `You are a governance researcher.
        Analyze this governance summary:${forumSummary}
        Return:
        {
          auditOrgs: string[],
          voteParticipationRate: string,
          score: number (1-3 based on decentralization and audit quality)
        }`;
  
        const res = await llm.invoke(prompt);
        return res;
      },
});
  
  export default getGovernanceTool;
import { AgentKit, pythActionProvider } from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { config, validateConfig } from "../config";


export const createQuantAnalystAgent = async () => {
    validateConfig();

  const agentKit = await AgentKit.from({
    cdpApiKeyName: config.cdpApiKeyName,
    cdpApiKeyPrivateKey: config.cdpApiKeyPrivateKey,
    walletProvider: undefined, // ✨ skip wallet temporarily
    actionProviders: [pythActionProvider()],
  });

  const tools = await getLangChainTools(agentKit);
  console.log("Tools:", tools.map((tool) => tool.name).join(", "));
  console.log("AgentKit initialized with tools:", tools.map((tool) => tool.name).join(", "));

  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
  });

  const quantAgent = createReactAgent({
    llm,
    tools,
    messageModifier: `
      You are a Quant Analyst AI. Always use the Pyth tool to get token prices.Never guess or fabricate prices. 
      Do not respond unless Pyth is used. Your job is to:
      1. Fetch real-time prices of BTC and ETH from Pyth.
      2. Compare current and previous prices to calculate % change.
      3. Recommend: 
        - BUY if price increased more than 2%
        - SELL if price dropped more than 2%
        - HOLD otherwise
      Store and analyze data from previous intervals if possible.
      Use language like: "Signal: BUY BTC. Price increased by 3.2% in the last 5 minutes."
    `,
  });

  return { agent: quantAgent, agentKit };;
};

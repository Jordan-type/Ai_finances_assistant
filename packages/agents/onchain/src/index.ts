import { AgentKit, CdpWalletProvider, wethActionProvider, walletActionProvider,
         erc20ActionProvider, erc721ActionProvider, cdpApiActionProvider, cdpWalletActionProvider, 
         pythActionProvider, openseaActionProvider, alloraActionProvider, } from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as fs from "fs";
import { config, validateConfig } from "./config";

import { createQuantAnalystAgent } from "./quant-analyst";
import { analyzeSentiment } from "./sentiment-analyst";
import { analyzeFundamentals } from "./fundamental-analyst";
import { getTraderBehaviorAgent } from "./trader-behavior-analyst";
import { getRiskManagerAgent } from "./risk-manager-analyst";
import { getFundManagerAgent } from "./fund-manager-analyst";

const WALLET_DATA_FILE = "wallet_data.txt";

export async function initializeAgent() {
  validateConfig();

  const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

  let walletDataStr: string | null = null;
  if (fs.existsSync(WALLET_DATA_FILE)) {
    walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
  }

  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: config.cdpApiKeyName,
    apiKeyPrivateKey: config.cdpApiKeyPrivateKey,
    cdpWalletData: walletDataStr || undefined,
    networkId: config.networkId,
  });

  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [
      wethActionProvider(),
      walletActionProvider(),
      erc20ActionProvider(),
      erc721ActionProvider(),
      pythActionProvider(),
      cdpApiActionProvider({
        apiKeyName: process.env.CDP_API_KEY_NAME!,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
      }),
      cdpWalletActionProvider({
        apiKeyName: process.env.CDP_API_KEY_NAME!,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
      }),
      ...(process.env.OPENSEA_API_KEY
        ? [
            openseaActionProvider({
              apiKey: process.env.OPENSEA_API_KEY,
              networkId: walletProvider.getNetwork().networkId,
              privateKey: await (
                await walletProvider.getWallet().getDefaultAddress()
              ).export(),
            }),
          ]
        : []),
      alloraActionProvider(),
    ],
  });

  const tools = await getLangChainTools(agentkit);
  const memory = new MemorySaver();

  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: `
      You are a helpful onchain agent using Coinbase AgentKit and LangChain. 
      You can perform transactions, interact with tokens, and query data.
    `,
  });

  fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(await walletProvider.exportWallet()));

  return { agent, config: { configurable: { thread_id: "agent-onchain-session" } } };
}


export { 
  createQuantAnalystAgent,
  analyzeSentiment,
  analyzeFundamentals,
  getTraderBehaviorAgent,
  getRiskManagerAgent,
  getFundManagerAgent 
}; 

export const allAgents = {
  createQuantAnalystAgent,
  analyzeSentiment,
  analyzeFundamentals,
  getTraderBehaviorAgent,
  getRiskManagerAgent,
  getFundManagerAgent,
};
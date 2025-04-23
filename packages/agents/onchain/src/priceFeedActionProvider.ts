import { ActionProvider, WalletProvider, Network, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";

const PriceFeedSchema = z.object({
    symbol: z.string(),
  });
  
  export class PriceFeedActionProvider extends ActionProvider<WalletProvider> {
    constructor() {
      super("price-feed-provider", []);
    }
  
    @CreateAction({
      name: "get-price-feed",
      description: "Fetches token price using Pyth Network.",
      schema: PriceFeedSchema,
    })
    async getPrice(walletProvider: WalletProvider, args: z.infer<typeof PriceFeedSchema>): Promise<string> {
      const { symbol } = args;
      return `Fetched price for ${symbol} (mock)`;
    }
  
    supportsNetwork = (network: Network) => network.networkId === "base-sepolia";
  }
  
  export const priceFeedActionProvider = () => new PriceFeedActionProvider();
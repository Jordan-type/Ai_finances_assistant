export type FundStrategy = {
    strategy: "Conservative" | "Balanced" | "Aggressive";
    goal: string;
    allocations: {
      BTC: {
        percentage: number;
        reason: string;
      };
      Stablecoins: {
        percentage: number;
        reason: string;
      };
      DeFiTokens: {
        percentage: number;
        reason: string;
      };
    };
    note: string;
  };
  
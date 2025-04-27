import { createQuantAnalystAgent } from "../quant-analyst";
import { exportSignalsToCSV } from "../utils/exportSignals";
import { getLangChainTools } from "@coinbase/agentkit-langchain";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
let previousPrices: Record<string, number> = {};

const trackedSymbols = [
  { display: "BTC/USD", tokenSymbol: "BTC" },
  { display: "ETH/USD", tokenSymbol: "ETH" },
  { display: "SOL/USD", tokenSymbol: "SOL" },
  { display: "LINK/USD", tokenSymbol: "LINK" },
  { display: "LTC/USD", tokenSymbol: "LTC" },
  { display: "DOGE/USD", tokenSymbol: "DOGE" },
  { display: "SHIB/USD", tokenSymbol: "SHIB" },
  { display: "XRP/USD", tokenSymbol: "XRP" },
  { display: "ADA/USD", tokenSymbol: "ADA" },
  { display: "DOT/USD", tokenSymbol: "DOT" },
  { display: "CELO/USD", tokenSymbol: "CELO" },
];


async function fetchCurrentPrices(agentKit: any): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  const tools = await getLangChainTools(agentKit);

  const feedTool = tools.find(t => t.name === "PythActionProvider_fetch_price_feed");
  const priceTool = tools.find(t => t.name === "PythActionProvider_fetch_price");
  // console.log("📦 PriceTool Schema:", priceTool);
  // console.log("📦 FeedTool Schema:", feedTool);

  // console.log("Pyth Feed Tool:", feedTool?.name);
  // console.log("Pyth Price Tool:", priceTool?.name);

  if (!feedTool || !priceTool) {
    console.error("❌ Required Pyth tools not found");
    return prices;
  }

  for (const { display, tokenSymbol } of trackedSymbols) {
    try {
      const feedResult = await feedTool.invoke({ tokenSymbol });
      const priceFeedId = typeof feedResult === "string" ? feedResult : (feedResult as any)?.id;
      console.log("Feed Result:", feedResult, "Price Feed ID:", priceFeedId);
  
      if (!priceFeedId) {
        console.warn(`⚠️ No feed ID found for ${tokenSymbol}`);
        continue;
      }
  
      const priceResult = await priceTool.invoke({ priceFeedID: priceFeedId  });
      console.log("Price Result:", priceResult);
  
      const parsed = typeof priceResult === "string" || typeof priceResult === "number"
        ? parseFloat(`${priceResult}`)
        : NaN;
  
      if (!isNaN(parsed)) {
        prices[tokenSymbol] = parsed;
        console.log(`📦 ${display} (${tokenSymbol}) price: ${parsed}`);
      } else {
        console.warn(`⚠️ Could not parse price for ${display}:`, priceResult);
      }
  
    } catch (err) {
      console.error(`❌ Error fetching price for ${tokenSymbol}:`, err);
    }
  }
  
  console.log("📦 Current Prices:", prices);
  return prices;
}


function comparePrices(oldPrices: Record<string, number>, newPrices: Record<string, number>) {
  const signals: string[] = [];

  for (const {display,  tokenSymbol} of trackedSymbols) {
    const oldPrice = oldPrices[tokenSymbol];
    const newPrice = newPrices[tokenSymbol];

    if (!oldPrice || !newPrice) {
      signals.push(`${tokenSymbol}: Unable to compare.`);
      continue;
    }

    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    const direction = change > 2 ? "📈 BUY" : change < -2 ? "📉 SELL" : "🤝 HOLD";
    signals.push(`${tokenSymbol}: ${direction} – Changed ${change.toFixed(2)}%`);
  }

  return signals;
}

export async function runQuantTest(intervalSeconds = 60) {
  console.log("🧠 Starting Quant Analyst Agent...");
  const { agent, agentKit } = await createQuantAnalystAgent();

  while (true) {
    console.log("\n🔍 Fetching current prices...");
    const currentPrices = await fetchCurrentPrices(agentKit);

    if (Object.keys(previousPrices).length > 0) {
      console.log("🔄 Comparing with previous prices...");
      const signals = comparePrices(previousPrices, currentPrices);
      signals.forEach(signal => console.log("📊 Signal:", signal));
      exportSignalsToCSV(signals, currentPrices);
    } else {
      console.log("📥 Storing initial price snapshot...");
    }

    previousPrices = currentPrices;
    console.log(`⏳ Waiting ${intervalSeconds}s before next check...`);
    await sleep(intervalSeconds * 1000);
  }
}

if (require.main === module) {
  runQuantTest(60).catch(err => {
    console.error("❌ Error running quant test:", err);
    process.exit(1);
  });
}

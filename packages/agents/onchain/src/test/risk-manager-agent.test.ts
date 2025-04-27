import { getRiskManagerAgent } from "../risk-manager-analyst"
import { z } from "zod"

async function runTest() {
  try {
    const input = {
      quantScore: 3,
      sentimentScore: 2,
      fundamentalScore: 3,
      traderBehaviorSignal: "BUY" as "BUY" | "SELL" | "HOLD"
    };

    const result = await getRiskManagerAgent().invoke(input);
    console.log("🚦 Risk Manager Agent Result:");
    console.dir(result, { depth: null });
  } catch (err) {
    console.error("❌ Error running RiskManagerAgent:", err);
  }
}

runTest();

import { getFundManagerAgent } from "../fund-manager-analyst";

async function runTest() {
  try {
    const input: { riskLevel: "MEDIUM" | "LOW" | "HIGH"; goal: string } = {
      riskLevel: "MEDIUM",
      goal: "short-term gains"
    };

    const agent = getFundManagerAgent();
    const result = await agent.invoke(input);
    
    console.log("💼 Fund Manager Agent Result:");
    console.dir(result, { depth: null });
  } catch (err) {
    console.error("❌ Error running FundManagerAgent:", err);
  }
}

runTest();

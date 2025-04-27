import { getTraderBehaviorAgent } from "../trader-behavior-analyst"

async function testTraderBehaviorAgent() {
  const agent = getTraderBehaviorAgent()

  const testSummary = `
  Over the past 24 hours, a group of 5 wallets (tagged as 'Smart Money') withdrew assets from centralized exchanges 
  and accumulated large positions in a newly launched token. There has been minimal outbound activity. On-chain voting 
  patterns show consistent participation in governance. Activity is concentrated but steady.
  `

  try {
    const result = await agent.invoke({ clusterSummary: testSummary })
    console.log("🧠 Trader Behavior Agent Result:\n", result)
  } catch (err) {
    console.error("❌ Error running TraderBehaviorAgent:", err)
  }
}

testTraderBehaviorAgent()

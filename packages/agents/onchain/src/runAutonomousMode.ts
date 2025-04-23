import { HumanMessage } from "@langchain/core/messages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runAutonomousMode(agent: any, config: any, interval = 10) {
  console.log("Autonomous mode: Executing onchain actions...");

  const thought = `
    Think creatively and execute onchain actions that demonstrate agent intelligence.
    Explore tools and interact with the blockchain in meaningful ways.
  `;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config);

    for await (const chunk of stream) {
      if ("agent" in chunk) console.log(chunk.agent.messages[0].content);
      else if ("tools" in chunk) console.log(chunk.tools.messages[0].content);
      console.log("-------------------");
    }

    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
}

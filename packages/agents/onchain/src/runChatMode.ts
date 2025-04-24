import readline from "readline";
import { HumanMessage } from "@langchain/core/messages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runChatMode(agent: any, config: any) {
  console.log("Starting chat mode. Type 'exit' to quit.");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const question = (q: string) => new Promise<string>((res) => rl.question(q, res));

  while (true) {
    const input = await question("\nPrompt: ");
    if (input.toLowerCase() === "exit") break;

    const stream = await agent.stream({ messages: [new HumanMessage(input)] }, config);

    for await (const chunk of stream) {
      if ("agent" in chunk) console.log(chunk.agent.messages[0].content);
      else if ("tools" in chunk) console.log(chunk.tools.messages[0].content);
      console.log("-------------------");
    }
  }

  rl.close();
}

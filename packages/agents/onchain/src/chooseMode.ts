import readline from "readline";

export async function chooseMode(): Promise<"chat" | "auto"> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>((res) => rl.question(q, res));

  while (true) {
    console.log("\nChoose mode:");
    console.log("1. chat  – Chat mode");
    console.log("2. auto  – Autonomous mode");
    const choice = (await ask("Enter choice: ")).toLowerCase().trim();
    rl.close();
    if (choice === "1" || choice === "chat") return "chat";
    if (choice === "2" || choice === "auto") return "auto";
  }
}

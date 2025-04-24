import { initializeAgent } from "../index";
import { runChatMode } from "../runChatMode";
import { runAutonomousMode } from "../runAutonomousMode";
import { chooseMode } from "../chooseMode";

(async () => {
  try {
    console.log("Starting Onchain Agent...");
    const { agent, config } = await initializeAgent();
    const mode = await chooseMode();

    if (mode === "chat") {
      await runChatMode(agent, config);
    } else {
      await runAutonomousMode(agent, config);
    }
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();

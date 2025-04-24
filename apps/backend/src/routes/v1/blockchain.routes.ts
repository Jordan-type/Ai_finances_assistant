import express, { Request, Response, RequestHandler } from "express";
import OpenAI from "openai";

// openAI client
import { createAssistant } from "../../openai/createAssitant";
import { createThread } from "../../openai/createThreads";
import { createRun } from "../../openai/createRun";
import { performRun } from "../../openai/performRun";


const router = express.Router();

const client = new OpenAI();


// global thread and assistant (created once on startup)
let thread: any;
let assistant: any;

// function to initialize the thread and assistant
async function initializeAssistantAndThread() {
    try {
        assistant = await createAssistant(client)
        thread = await createThread(client)
    } catch (error) {
        console.log('Error during initialization:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
}


// endpoint to handle chat completions
router.post("/openai/chatCompletion", (async (req: Request, res: Response): Promise<void> => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
          res.status(400).json({ error: "Messages must be a non-empty array" });
        }
    
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage?.content) {
          res.status(400).json({ error: "Last message must include content" });
        }

        if (!assistant || !thread) {
          await initializeAssistantAndThread();
        }
        
        const userMessage = lastMessage.content;
        await client.beta.threads.messages.create(thread.id, {role: "user", content: userMessage});
    
        const run = await createRun(client, thread, assistant.id);
        const result = await performRun(run, client, thread);
    
        const formattedResult = {
          choices: [
            {
              message: {
                role: result.type === "text" ? "assistant" : "tool",
                content: result.type === "text" ? result.text.value : "No response content available",
              },
            },
          ],
        };
    
        res.status(200).json(formattedResult);
      } catch (err) {
        console.error("ChatCompletion Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
}) as RequestHandler);


export default router;
export { initializeAssistantAndThread, thread, assistant }; // export the thread and assistant for use in other modules
import express, { Request, Response, RequestHandler } from "express"
import OpenAI from "openai"

// import express and OpenAI client
import { createAssistant } from "./openai/createAssitant.js";
import { createThread } from "./openai/createThreads.js";
import { createRun } from "./openai/createRun.js";
import { performRun } from "./openai/performRun.js";

// import market agent
import { runMarketAgent } from "./agents/marketAgent.js";


// Initialize Openai client
const client = new OpenAI()

// Initialize Express app
const app = express()
const port = process.env.PORT || 3001

// parse json bodies in the request
app.use(express.json())


// global thread and assistant (created once on startup)
let thread: any;
let assistant: any;

// function to initialize the thread and assistant
async function initialize() {
    try {
        assistant = await createAssistant(client)
        thread = await createThread(client)
    } catch (error) {
        console.log('Error during initialization:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
}

// endpoint to handle chat completions
app.post("/openai/chatCompletion", (async (req: Request, res: Response) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages must be an array' });
        }

        // get the latest user message (the last message in the array)
        const userMessage = messages[messages.length - 1].content;
        if (!userMessage) {
            return res.status(400).json({ error: 'User message content is required' });
        }


        // add user message to the thread
        const threadMessage = await client.beta.threads.messages.create(thread.id, { role: "user", content: userMessage })


        // create and perform the run
        const run = await createRun(client, thread, assistant.id)
        const result = await performRun(run, client, thread)


        // format the result
        const formattedResult = {
            choices: [
                {
                    message: {
                        role: result.type === "text" ? "assistant" : "tool",
                        content: result.type === "text" ? result.text.value : 'No response content available',
                    }
                }
            ]
        }


        // return the result
        res.status(200).json(formattedResult)

    } catch (error) {
        console.log('Error during chat completion:', error instanceof Error ? error.message : 'Unknown error');
        res.status(500).json({ error: 'An error occurred during chat completion' });
    }
}) as RequestHandler)

// start the server and initialize the thread and assistant
async function startServer() {
    try {   
        await initialize()
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log('Error during server startup:', error instanceof Error ? error.message : 'Unknown error');
    }
}

// startServer()

// test market 
const idea = "A decentralized ride-sharing platform for rural Africa using Celo blockchain.";
const theme = "Decentralization, Ride-sharing, Blockchain for Africa, Mobility, Rural Innovation";
runMarketAgent(idea, theme).then(answers => console.log(answers));


// export the app for testing
export { app, startServer, initialize, thread, assistant };

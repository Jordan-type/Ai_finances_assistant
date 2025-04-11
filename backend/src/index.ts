import express, { Request, Response, RequestHandler } from "express"
import OpenAI from "openai"
import "dotenv/config"

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
runMarketAgent(idea, theme);













// async function main() {

//     const client = new OpenAI()
//     const message = "Hello, Batman!. Deploy an ERC20 token with name `Test Token` and symbol `TEST`"   // Can you send 0.1 CELO to 0xB7E99B6a56518d42Eb2959f20D48bf3d17886993"

//     const assistant = await createAssistant(client)
//     const thread = await createThread(client, message)
//     const run = await createRun(client, thread, assistant.id)
//     const result  = await performRun(run, client, thread)



//     console.log(result);
// }

// main()

// 0x8F3d8E8aa095eb8D5A9AdD053e249955061EB358

// import "dotenv/config"
// import OpenAI from "openai"
// import readline from "readline"

// import { createAssistant } from "./openai/createAssitant.js";
// import { createThread } from "./openai/createThreads.js";
// import { createRun } from "./openai/createRun.js";
// import { performRun } from "./openai/performRun.js";
// import { Thread } from 'openai/resources/beta/threads/threads';
// import { Assistant } from 'openai/resources/beta/assistants';


// const client = new OpenAI()

// // create interface or reading from the command line
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// // type-safe promise-based questions function
// const question = (query: string) => {
//     return new Promise<string>((resolve) => rl.question(query, resolve))
// }

// // chat loop
// async function chat(thread: Thread, assistant: Assistant): Promise<void> {
//     while (true) {
//         const userMessage = await question("\nYou: ")

//         // allow the user to exit the loop
//         if (userMessage.toLowerCase() === "exit") {
//             rl.close()
//             console.log("Exiting...")
//             break
//         }

//         try {
//             // add the user's message to the thread
//             await client.beta.threads.messages.create(thread.id, { role: "user", content: userMessage })

//             // create and perfom the run
//             const run = await createRun(client, thread, assistant.id)
//             const result = await performRun(run, client, thread)

//             // print the result
//             if (result.type === "text") {
//                 console.log(`\nBatman: ${result.text.value}`)
//             }             
//         } catch (error) {
//             console.error('Error during chat:', error instanceof Error ? error.message : 'Unknown error');
//             rl.close();
//             break;
//         }
//     }
// }




// async function main() {
//     try {
//         // const message = "Hello, Batman!. Can you get my wallet balance? My wallet address is 0x8F3d8E8aa095eb8D5A9AdD053e249955061EB358"
//         const assistant = await createAssistant(client)
//         const thread = await createThread(client)

//         await chat(thread, assistant)
//     } catch (error) {
//         console.error('Error during main:', error instanceof Error ? error.message : 'Unknown error');
//         rl.close();
//     }
// }


// main().catch((error) => {
//     console.error('Error during main:', error instanceof Error ? error.message : 'Unknown error');
//     process.exit(1);
// })
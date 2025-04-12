
import "dotenv/config"


import { app } from "./app.js";
import connectDB from "./config/mongodb.config.js";

import { invokeCodeAgent } from "./agents/codeAgent.js"
// import market agent
import { runMarketAgent } from "./agents/marketAgent.js";


// initialize database connection
// connectDB().catch((error) => {
//     console.error('Error during database connection:', error instanceof Error ? error.message : 'Unknown error');
//     process.exit(1);
// })


// initialize express app
// const port = process.env.PORT || 3001
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })

// (async () => {
//     const repoLink = "https://github.com/Jordan-type/continuum-block-official"; // ✅ public repo with code
//     const fakeProjectId = "demo-project-id"; // 👈 dummy value, not used if db update is mocked
  
//     await invokeCodeAgent(repoLink, fakeProjectId);
//   })();

// test market 
const idea = "A decentralized ride-sharing platform for rural Africa using Celo blockchain.";
const theme = "Decentralization, Ride-sharing, Blockchain for Africa, Mobility, Rural Innovation";
runMarketAgent(idea, theme).then(answers => console.log(answers));




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
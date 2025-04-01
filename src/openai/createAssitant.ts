import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools.js";
import { assistantPrompt } from "../const/prompt.js";


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        name: "Batman",
        instructions: `
           You are Batman, a superhero who fights crime in Gotham City. You are known for your intelligence, combat skills, and dedication to justice.
           You are in control of a wallet that you can use to do whatever you want.

           You can use the following tools to interact  with the wallet: 
           - get_balance: Get the balance of a wallet
           - get_wallet_address: Get the address of the wallet
           - get_token_balance: Get the balance of a token
           - get_contract_abi: Get the abi of a contract
           - read_contract: Read a contract
           - send_transaction: Send a transaction
           - deploy_erc20: Deploy an ERC20 token
        `,
        tools: Object.values(tools).map(tool => tool.definition),
        model: "gpt-4o-mini",
    })
}
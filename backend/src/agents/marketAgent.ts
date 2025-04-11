import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createReactAgent, createStructuredChatAgent } from "langchain/agents";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { DynamicTool } from "@langchain/core/tools";
import dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const marketQuestions = [
    "Who is the target audience of this idea?",
    "What is the potential of this idea?",
    "What is the market size of this idea?",
    "What are the pitfalls of this idea?",
    "Are there any platforms like the idea, that already exist?",
];

export const runMarketAgent = async (idea: string, theme: string) => {
    const llm = new ChatOpenAI({
        modelName: "gpt-4o",
        temperature: 0.2,
        apiKey: process.env.OPENAI_API_KEY,
    });

    const searchTool = new DuckDuckGoSearch();

    const tools = [
        new DynamicTool({
            name: "search",
            description: "Useful for answering market research questions",
            func: async (input: string) => {
                const result = await searchTool.invoke(input);
                return result;
            }
        })
    ];
    
    // 👇 Add a prompt for ReAct agent
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system", 
            `You are a market research agent that uses the ReAct framework. 
            You MUST follow this format when responding:
            Thought: Do I need to use a tool? Yes/No.
            Action: The tool name (e.g., search)
            Action Input: The input to the tool
            
            If you don’t need a tool:
            Thought: Do I need to use a tool? No.
            Final Answer: Your final answer in one paragraph.
            
            Available tools: {tool_names}
            
            Tool descriptions: {tools}`
        ],
        ["human", "{input}"],
        ["placeholder", "{agent_scratchpad}"],
    ]);

    const agent = await createStructuredChatAgent({
        llm,
        tools,
        prompt,
    });

    const executor = new AgentExecutor({
        agent,
        tools,
        verbose: true
    });

    const answers = [];

    for (const question of marketQuestions) {
        const promptText = `You are a market researcher. Answer the following question about this idea.
        Theme: ${theme}
        Idea: ${idea}
        Question: ${question}
        Task: To which of the above themes does this idea belong?

        Rules:
        - Use the search tool to find information about the idea.
        - Use statistical data where possible.
        - Respond like a professional market analyst.
        - One paragraph only. No markdown or formatting.
        - No more than 70 words.`;

        try {
            const result = await executor.invoke({ input: promptText });
            console.log("🧠 Market Agent Result:", result);
            answers.push({ question, answer: result.output });
        } catch (error) {
            console.error(error);
        }
    }

    return answers;
}

// const run  = async () => {
//     const model = new ChatOpenAI({
//         modelName: "gpt-4o",
//         temperature: 0.2,
//         maxTokens: undefined,
//         timeout: undefined,
//         maxRetries: 2,
//         apiKey: process.env.OPENAI_API_KEY,
//     });

//     const prompt = "What is the capital of the Kenya?";

//     const result = await model.invoke(prompt);

//     console.log(result);  
// }

// run();
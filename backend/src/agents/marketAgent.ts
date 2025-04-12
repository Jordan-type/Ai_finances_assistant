import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createReactAgent, createStructuredChatAgent } from "langchain/agents";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { DynamicTool } from "@langchain/core/tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

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

    const searchTool = new DuckDuckGoSearch({ maxResults: 5});

    const tools = [
        new DynamicTool({
            name: "market_search",
            description: "Search for market research data, statistics, and insights about the idea.",
            func: async (input: string) => {
                try {
                    const result = await searchTool.invoke(input);
                    return JSON.stringify(result);
                } catch (error) {
                    return "Search failed, please rely on reasoning.";
                }
            }
        })
    ];
    
    // 👇 Add a prompt for ReAct agent
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system", 
            `You are a market research agent that uses the ReAct framework. For each question:
            - Thought: Decide if a tool is needed (Yes/No).
            - Action: If Yes, specify 'search' and the query.
            - Action Input: A precise search query tailored to the question, idea, and theme.
            - Final Answer: A concise, data-driven answer (one paragraph, max 70 words). Use statistics if available, cite sources (e.g.,), and avoid generic responses. If no data, provide reasoned analysis.
            
            Idea: {idea}
            Theme: {theme}
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
        verbose: true,
        maxIterations: 5,
    });

    const answers = [];

    for (const question of marketQuestions) {
        const promptText = `You are a market researcher. Answer the following question about this idea.
        Idea: ${idea}
        Theme: ${theme}
        Question: ${question}
        Task: To which of the above themes does this idea belong?

        Rules:
        - Use the market_search tool for relevant information about the idea.
        - Use statistical data where possible.
        - Respond like a professional market analyst.
        - One paragraph only. No markdown or formatting.
        - No more than 70 words.`;

        try {
            const result = await executor.invoke({ input: promptText, idea, theme, question });
            console.log("🧠 Market Agent Result:", result);
            answers.push({ question, answer: result.output });
        } catch (error) {
            console.log(`Error processing question "${question}":`, error);
            answers.push({ question, answer: "Unable to retrieve answer due to an error." });
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
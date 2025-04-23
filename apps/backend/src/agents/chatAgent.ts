import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory"; 
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";
import { VectorStoreRetrieverMemory } from "langchain/memory";
import dotenv from "dotenv";

import { updateProjectChatHistory } from "../modules/services/project.service";

dotenv.config();

const DEFAULT_TEMPLATE = `The following is a conversation between a hackathon judge and an AI. 
The AI is a market researcher and a code reviewer. 
Rules for answering:
1. Use statistical data where ever possible.
2. Remember to answer like a market researcher.
3. Answer the question as best you can, in a paragraph.
4. You must answer in one paragraph. Do not use formatting.
5. Your paragraph must not have more than 70 words.
6. You must analyze all the files in the project when a code related question is asked.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`;

const runChatAgent = async (
  repoUrl: string, 
  projectMeta: { 
    idea: string;
    theme: string; 
    technologies: string[] 
  }, 
  chatHistory: { 
    input: string; output: string }[], 
    newQuestion: string, 
    projectId: string
  ) => {
  try {
    console.log("💬 Chat Agent: Initializing chat...");

    const loader = new GithubRepoLoader(repoUrl, {
      branch: "main",
      recursive: true,
      accessToken: process.env.GITHUB_TOKEN,
      maxConcurrency: 4,
      ignorePaths: [
        "**/node_modules/**",
        "**/*.lock",
        "**/*.json",
        "**/*.md",
        "**/dist/**",
        "**/__pycache__/**",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
      ],
    });

    const docs = [];
    for await (const doc of loader.loadAsStream()) docs.push(doc);
    console.log(`📄 Loaded ${docs.length} documents from repo.`);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(docs);
    const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, new OpenAIEmbeddings());

    const retriever = vectorStore.asRetriever();
    const memory = new VectorStoreRetrieverMemory({ vectorStoreRetriever: retriever, memoryKey: "history" });

    // save metadata context to memory
    memory.saveContext({ input: `Idea: ${projectMeta.idea}` }, { output: "..." });
    memory.saveContext({ input: `Theme: ${projectMeta.theme}` }, { output: "..." });
    memory.saveContext({ input: `Technologies: ${projectMeta.technologies.join(", ")}` }, { output: "..." });

    const llm = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.2,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = new PromptTemplate({
        inputVariables: ["history", "input"], // ✅ FIXED
        template: DEFAULT_TEMPLATE,
    });

    const chain = new ConversationChain({ 
        llm, 
        prompt, 
        memory, 
        verbose: true
    });

    const aiResponse = await chain.predict({ input: newQuestion });
    const newChatEntry = { input: newQuestion, output: aiResponse };
    chatHistory.push(newChatEntry);
    console.log("✅ Chat Agent Response:", aiResponse);

    if (projectId) {
      try {
       const chazt = await updateProjectChatHistory(projectId, newChatEntry);
        console.log("✅ Chat history updated in DB.", chazt);
      } catch (error) {
        console.error("❌ Failed to update chat history in DB:", error);
      }
    }

    return {
      answer: aiResponse,
      chatHistory,
    };
  } catch (error) {
    console.error("❌ Chat Agent error:", error);
    return {
      answer: "An error occurred while generating response.",
      chathistory: chatHistory,
    };
  }
};

export { 
    runChatAgent 
};



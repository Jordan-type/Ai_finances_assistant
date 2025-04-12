import { ChatOpenAI } from "@langchain/openai";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FakeEmbeddings } from "langchain/embeddings/fake";
import dotenv from "dotenv";

dotenv.config();

// import { getLatestHackathon } from "../modules/services/hackathon.service.js";
// import { updateProjectCodeInsights } from "../modules/services/project.service.js";

const prompt = `
You are a code reviewer. This is a hackathon project. You have to answer the question about the project.
Question: {question}
Rules for answering:
1. Remember to answer like a code reviewer.
2. Answer the question as best you can. If you are unable to answer, say 'I am unsure, I need human assistance'.
3. You must answer in one paragraph. Do not use formatting.
4. Your paragraph must not have more than 70 words.
5. You must analyze all the files in the project.
6. If you don't know the answer, you must research and answer.
`;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function batchEmbedChunks(
  chunks: any[],
  batchSize: number = 200,
  useFake: boolean = false
) {
  const allVectors = [];
  const embedder = useFake ? new FakeEmbeddings() : new OpenAIEmbeddings();
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`📦 Embedding batch ${i} - ${i + batch.length} of ${chunks.length}...`);
    const embedded = await MemoryVectorStore.fromDocuments(batch, embedder);
    allVectors.push(...embedded.memoryVectors);
    await sleep(500); // prevent rate-limit
  }
  const vectorStore = new MemoryVectorStore(embedder);
  vectorStore.memoryVectors = allVectors;
  return vectorStore;
}


const invokeCodeAgent = async (repoLink: string, projectId: string): Promise<void> => {
    console.log("🔍 Code Agent: Analyzing project...");
    try {
        const loader = new GithubRepoLoader(repoLink, {
            branch: "main", // You can make this dynamic if needed
            recursive: true,
            accessToken: process.env.GITHUB_TOKEN,
            maxConcurrency: 5,
            ignorePaths: [
                "**/test/**",
                "**/tests/**",
                "**/*.md",
                "**/*.json",
                "**/*.lock",
                "**/node_modules/**",
                "**/dist/**",
                "**/*.png",
                "**/*.jpg",
                "**/*.jpeg",
                "**/*.svg",
                "**/coverage/**",
                "**/build/**",
                "**/out/**",
                "**/public/**",
                "**/assets/**",
                "**/docs/**",
                "**/examples/**",
                "**/demo/**",
                "**/sample/**",
                "**/samples/**",
                "**/assets/**",
                "**/static/**",
                "**/lib/**",
                "**/vendor/**",
            ],
          });

        const docs = [];
        let counter = 0;
        console.log("📦 Streaming repo files and converting to documents...");
          for await (const doc of loader.loadAsStream()) {
            counter++;
            if (counter % 10 === 0) console.log(`🔍 Processed ${counter} files...`);
            docs.push(doc);
          }
        console.log(`✅ Finished loading ${counter} documents.`);
      
          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
          });
      
          const splitDocs = await splitter.splitDocuments(docs);
          console.log(`🧠 Split into ${splitDocs.length} chunks for embedding.`);
      
          const useFakeEmbeddings = process.env.USE_FAKE_EMBEDDINGS === "true";
          const vectorStore = await batchEmbedChunks(splitDocs, 200, useFakeEmbeddings);

        const llm = new ChatOpenAI({
            modelName: "gpt-4o",
            temperature: 0.2,
            openAIApiKey: process.env.OPENAI_API_KEY,
        });


        // const hackathon = await getLatestHackathon();
        // const technologies = hackathon?.technologies?.join(", ") || ""; 
        //  ${technologies}

        const questionToAsk = [
            "What are the technologies and programming language used in this project?",
            "Explain the project in brief",
            "How is the code quality of this project?",
            `Does the project import and use any of the following dependencies/packages/APIs/libraries: ?`
          ];

        const agentAnswers: { question: string; answer: string }[] = [];

        for (const question of questionToAsk) {
            const result = await vectorStore.similaritySearch(question, 1);
            const context = result?.[0]?.pageContent || "No relevant document found.";
      
            const answerPrompt = `${prompt.replace("{question}", question)}\n\nContext:\n${context}`;
            const answer = await llm.invoke(answerPrompt);
      
            agentAnswers.push({ question, answer: typeof answer.content === "string" ? answer.content : JSON.stringify(answer.content) });
          }
      
        //   await updateProjectCodeInsights(projectId, agentAnswers);
        console.log("✅ Code Agent: Analysis complete.", agentAnswers);
        
    } catch (error) {
        console.error("❌ Code Agent error:", error);
    }

};

export { 
    invokeCodeAgent 
};


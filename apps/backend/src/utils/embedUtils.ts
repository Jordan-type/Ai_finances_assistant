import { Pinecone } from "@pinecone-database/pinecone";
import { CohereClient } from "cohere-ai";
import * as dotenv from "dotenv";
import { Document } from "@langchain/core/documents";

dotenv.config();

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY || ""
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || "",
})

const INDEX_NAME = "projects-index";
const REGION = "us-east-1"; // or your preferred region
const MODEL = "embed-english-v2.0";

export async function initIndex() {
    const indexExists = ((await pinecone.listIndexes()).indexes ?? []).some(idx => idx.name === INDEX_NAME);
  
    if (!indexExists) {
      await pinecone.createIndexForModel({
        name: INDEX_NAME,
        cloud: "aws",
        region: REGION,
        embed: {
          model: MODEL,
          fieldMap: { text: "chunk_text" },
        },
        waitUntilReady: true,
      });
    }
  
    return pinecone.index(INDEX_NAME);
  }
  
  export async function embedDocumentsToPinecone(docs: string[]) {
    const index = await initIndex();
  
    const records = docs.map((text, i) => ({
      id: `doc-${i}`,
      values: Array(768).fill(0), // Replace with actual embedding values
      fields: {
        chunk_text: text,
        category: "project",
      },
    }));
  
    await index.upsert(records);
    console.log("✅ Uploaded documents to Pinecone.");
  }
  
  export async function searchInPinecone(query: string, topK: number = 10): Promise<any[]>  {
    const index = pinecone.index(INDEX_NAME);
    const results = await index.searchRecords({
      query: {
        topK,
        inputs: { text: query },
      },
    });
  
    return results.result.hits || []; 
  }

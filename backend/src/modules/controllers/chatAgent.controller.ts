
import { Request, Response } from "express";
import { runChatAgent } from "../../agents/chatAgent";

import { updateProjectChatHistory } from "../services/project.service";
import { getProjectById } from "../services/project.service";


const invokeChatAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { repoUrl, projectMeta, chatHistory = [], question, projectId } = req.body;
    console.log("🔍 Chat Agent: Request received:", req.body);

    if (!repoUrl || !projectMeta || !question) {
      res.status(400).json({ error: "Missing required fields" });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
    }

    const result = await runChatAgent(repoUrl, projectMeta, chatHistory, question, projectId);

    console.log("💬 Chat Agent: AI response generated:", result);

    res.status(200).json({ 
      message: "AI response generated", 
      result 
    });
  } catch (error) {
    console.log("❌ Chat Agent Controller Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export {
    invokeChatAgent,
}

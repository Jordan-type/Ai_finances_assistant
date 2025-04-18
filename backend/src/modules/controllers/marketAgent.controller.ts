import { Request, Response } from "express";
import { runMarketAgent } from "../../agents/marketAgent";

import { updateProjectMarketInsights } from "../services/marketAgent.service";
import { getLatestHackathon } from "../services/hackathon.service";
import { getProjectById } from "../services/project.service";


const invokeMarketAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.body;
  
      if (!projectId) {
        res.status(400).json({ 
            error: "Missing projectId in request body" 
        });
      }
  
      const project = await getProjectById(projectId);
      const hackathon = await getLatestHackathon();
      console.log("Hackathon details:", hackathon);
  
      if (!project) {
        res.status(404).json({ 
            error: "Project not found" 
        });
      }
  
      if (!hackathon || !hackathon.isAllowed) {
        res.status(403).json({ 
            error: "Market Agent is not allowed to run currently." 
        });
      }
  
      const themeString = Array.isArray(hackathon.theme) ? hackathon.theme.join(", ") : hackathon.theme;
      console.log("Theme String:", themeString);
      const insights = await runMarketAgent(project.shortDescription, themeString, projectId);
      const updatedProject = await updateProjectMarketInsights(projectId, insights, themeString);
  
      res.status(200).json({
        message: "Market Agent completed successfully",
        insights,
        updatedProject,
      });
    } catch (err: any) {
      console.log("Error running Market Agent:", err);
      res.status(500).json({ 
        error: "Internal server error", 
        details: err.message 
      });
    }
};

export { 
    invokeMarketAgent 
};
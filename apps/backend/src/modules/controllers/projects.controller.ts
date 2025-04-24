import { Request, Response } from "express";
import { invokeCodeAgent } from "../../agents/codeAgent";
import { runMarketAgent } from "../../agents/marketAgent";
import { createHackathon } from "../services/hackathon.service";
import { createProject, getProjectById, getAllProjects, updateProjectReviewStatus, } from "../services/project.service";
import { embedDocumentsToPinecone, searchInPinecone } from "../../utils/embedUtils";

type PineconeHit = {
    id: string;
    score?: number;
    fields?: Record<string, any>;
  };
  

const createProjectHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    data.name = data.title
    data.isReviewed = false;

    const project = await createProject(data);
    console.log("✅ Created Project ID:", project);

    const projectId = project?._id.toString() || "";
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    console.log("✅ Invoked Code Agent for project ID:", project?._id.toString());

    await runMarketAgent(data.shortDescription, data.theme, projectId);
    if (typeof data.githubLink !== "string") {
      throw new Error("Invalid githubLink: must be a string");
    }

    await invokeCodeAgent(data.githubLink, projectId);

    res.status(201).json({ 
        message: "Project created", 
        data: project
    });
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({ 
    error: "Internal Server Error" 
    });
  }
};

const createHackathonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const hackathon = await createHackathon(data);

    res.status(201).json({ 
      message: "Hackathon created", 
      data: hackathon 
    });
  } catch (error) {
    console.error("❌ Error creating hackathon:", error);
    res.status(500).json({ 
      error: "Internal Server Error"
     });
  }
};

const getProjectByIdHandler = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(400).json({ error: "Project ID is required" });
  }

  try {
    const project = await getProjectById(projectId);
    res.status(200).json({ 
      message: "successful",
      data: project 
    });
  } catch (error) {
    console.error("❌ Error getting project:", error);
    res.status(404).json({ error: "Project not found" });
  }
};

const getAllProjectsHandler = async (_: Request, res: Response): Promise<void> => {
  try {
    const allProjects = await getAllProjects();
    res.status(200).json({ message: "successful", projects: allProjects.reverse() });
  } catch (error) {
    console.error("❌ Error getting all projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReviewStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id, isReviewed } = req.body;
    await updateProjectReviewStatus(project_id, isReviewed);
    res.status(200).json({ message: "Review updated", project_id });
  } catch (error) {
    console.error("❌ Error updating review status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProjectsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    const projects = await getAllProjects();

    const texts = projects.map(
      (p) => `Project Description: ${p.longDescription} Hackathon Theme: ${p.theme}`
    );

    await embedDocumentsToPinecone(texts);
    const hits = await searchInPinecone(query);

    const results = hits.map((hit: PineconeHit) => {
        const index = parseInt(hit.id.replace("doc-", ""), 10);
        return projects[index];
    });

    res.status(200).json({ message: "successful", projects: results });
  } catch (error) {
    console.error("❌ Error during semantic search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createProjectHandler,
  createHackathonHandler,
  getProjectByIdHandler,
  getAllProjectsHandler,
  updateReviewStatusHandler,
  searchProjectsHandler,
};
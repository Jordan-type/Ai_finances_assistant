import Project from "../models/project";
import Hackathon from "../models/hackathon";

const getLatestHackathonDetails = async () => {
  const latest = await Hackathon.findOne({}).sort({ createdAt: -1 });
  if (!latest) throw new Error("No hackathon configuration found");
  return {
    technologies: latest.technologies.join(", "),
    theme: latest.theme.join(", "),
    isAllowed: latest.isAllowed ?? false,
  };
};

const updateProjectMarketInsights = async (projectId: string, analysis: { question: string; answer: string }[], theme: string) => {
  const updated = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: {
        marketAgentAnalysis: analysis,
        theme,
        updatedAt: new Date(),
      },
    },
    { new: true }
  );

  if (!updated) throw new Error("Project update failed or not found");
  return updated;
};

const getProjectById = async (projectId: string) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  return project;
};

export {
    getLatestHackathonDetails,
    updateProjectMarketInsights,
    getProjectById
}

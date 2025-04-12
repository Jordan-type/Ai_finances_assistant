// project.service.ts
import Project from "../project.js";

const createProject = async (data: any) => {
  const project = new Project(data);
  return await project.save();
};

const getProjectById = async (projectId: string) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching project: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the project.");
    }
  }
};

const getAllProjects = async () => {
  try {
    const projects = await Project.find().sort({ submissionTime: -1 });
    return projects;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the projects.");
    }
  }
};

const updateProjectReviewStatus = async (projectId: string, isReviewed: boolean) => {
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          isReviewed,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );
    if (!project) {
      throw new Error("Project not found");
    }
    return project;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating project review status: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating the project review status.");
    }
  }
};

const updateProjectCodeInsights = async ( projectId: string, analysis: { question: string; answer: string }[]) => {
  try {
    const project =  await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          codeAgentAnalysis: analysis,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating project code insights: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating the project code insights.");
    }
  }
};


export {
    createProject,
    getProjectById,
    getAllProjects,
    updateProjectReviewStatus,
    updateProjectCodeInsights
}
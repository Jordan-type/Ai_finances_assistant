import Project from "../models/project";

const createProject = async (data: any) => {
  try{
    const project = new Project(data);
    return await project.save();
  } catch (error) {
    console.log(error)
  }
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
      throw new Error(`Error fetching project: ${error}`);
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

const updateProjectMarketInsights = async (projectId: string, analysis: { question: string; answer: string }[]) => {
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          marketAgentAnalysis: analysis,
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
      throw new Error(`Error updating project market insights: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while updating market insights.");
    }
  }
};

const updateProjectChatHistory = async (projectId: string, newChat: { input: string; output: string }) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    project.chatHistory.push(newChat);
    project.updatedAt = new Date();
    return await project.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating project chat history: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating the project chat history.");
    }
  }
};


export {
    createProject,
    getProjectById,
    getAllProjects,
    updateProjectReviewStatus,
    updateProjectCodeInsights,
    updateProjectMarketInsights,
    updateProjectChatHistory,
}
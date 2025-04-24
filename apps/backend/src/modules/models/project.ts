import mongoose, { Schema } from "mongoose";

const questionAnswerSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
  });
  
  const chatMessageSchema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
  });
  
  const projectSchema = new Schema({
    title: { type: String, required: true }, // Project name
    teamName: { type: String, required: false }, // Team name
    teamMembers: [{ type: String, required: false }], // Could be user IDs or names
  
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    githubLink: { type: String, required: true },
    demoLink: { type: String, required: false }, // Optional demo link
    submissionTime: { type: Date, default: Date.now },
  
    marketAgentAnalysis: [questionAnswerSchema], // Market insights
    codeAgentAnalysis: [questionAnswerSchema], // Code review insights
    chatHistory: [chatMessageSchema], // Optional, if you want to store chat logs
  
    theme: { type: String, required: false }, // Predicted theme, 
    isReviewed: { type: Boolean, default: false },
  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  projectSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });
  
  const ProjectModel = mongoose.model("Projects", projectSchema);
  export default ProjectModel;
  
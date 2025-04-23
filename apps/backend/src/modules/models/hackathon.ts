import mongoose, { Schema } from "mongoose";

const hackathonSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  theme: [{ type: String, required: true }], // List of themes
  technologies: [{ type: String, required: true }], // e.g., ["Python", "Solidity", "Celo"]
  isAllowed: { type: Boolean, default: false }, // Controls agent access
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

hackathonSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const HackathonModel = mongoose.model("Hackathons", hackathonSchema);
export default HackathonModel;

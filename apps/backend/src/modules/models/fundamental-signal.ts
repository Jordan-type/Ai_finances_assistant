import mongoose from "mongoose";

const FundamentalSignalSchema = new mongoose.Schema({
  project: { type: String, required: true },
  stage: { type: String },
  backers: [{ type: String }],
  score: { type: Number, min: 1, max: 3 },
  summary: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("FundamentalSignal", FundamentalSignalSchema);

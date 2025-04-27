import mongoose from "mongoose";

const RiskReportSchema = new mongoose.Schema({
  quantScore: { type: Number, min: 1, max: 3 },
  sentimentScore: { type: Number, min: 1, max: 3 },
  fundamentalScore: { type: Number, min: 1, max: 3 },
  traderBehaviorSignal: { type: String, enum: ["BUY", "SELL", "HOLD"] },
  riskLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
  riskScore: { type: Number, min: 0, max: 10 },
  recommendation: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("RiskReport", RiskReportSchema);

import mongoose from "mongoose";

const TraderBehaviorSignalSchema = new mongoose.Schema({
  walletCluster: { type: String },
  activityLevel: { type: String },
  behaviorPattern: { type: String },
  signal: { type: String, enum: ["BUY", "SELL", "HOLD"], required: true },
  confidence: { type: String, enum: ["High", "Medium", "Low"] },
  notes: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("TraderBehaviorSignal", TraderBehaviorSignalSchema);

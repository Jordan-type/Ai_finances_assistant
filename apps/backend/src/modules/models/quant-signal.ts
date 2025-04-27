import mongoose from "mongoose";

const QuantSignalSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  interval: { type: String, required: true },
  signal: { type: String, enum: ["BUY", "SELL", "HOLD"], required: true },
  confidence: { type: String, enum: ["High", "Medium", "Low"], required: true },
  change: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("QuantSignal", QuantSignalSchema);

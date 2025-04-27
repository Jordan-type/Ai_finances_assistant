import mongoose from "mongoose";

const SentimentSignalSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  sentimentScore: { type: Number, required: true },
  signal: { type: String, enum: ["BUY", "SELL", "HOLD"], required: true },
  confidence: { type: String, enum: ["High", "Medium", "Low"], required: true },
  notes: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("SentimentSignal", SentimentSignalSchema);

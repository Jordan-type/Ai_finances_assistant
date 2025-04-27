import mongoose from "mongoose";

const TradeExecutionSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  action: { type: String, enum: ["BUY", "SELL"], required: true },
  amount: { type: Number, required: true },
  executedBy: { type: String }, // wallet address or user id
  txHash: { type: String },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "FAILED"], default: "PENDING" },
  strategyContext: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("TradeExecution", TradeExecutionSchema);

import mongoose from "mongoose";

const AllocationSchema = new mongoose.Schema({
  percentage: { type: Number },
  reason: { type: String }
}, { _id: false });

const FundStrategySchema = new mongoose.Schema({
  strategy: { type: String },
  goal: { type: String },
  allocations: {
    BTC: { type: AllocationSchema },
    Stablecoins: { type: AllocationSchema },
    DeFiTokens: { type: AllocationSchema },
  },
  note: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("FundStrategy", FundStrategySchema);

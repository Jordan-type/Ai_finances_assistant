import { Request, Response } from "express";
import { saveTraderBehaviorSignal, getRecentTraderSignals } from "../services/traderBehaviorSignal.service";
import { getTraderBehaviorAgent } from "@agents/onchain";

const runTraderBehaviorAgentAndSave = async (req: Request, res: Response) => {
  try {
    const agent = getTraderBehaviorAgent();
    const agentResult = await agent.invoke({ clusterSummary: req.body.clusterSummary });

    const savedSignal = await saveTraderBehaviorSignal(agentResult);

    res.status(201).json(savedSignal);
  } catch (error) {
    console.error("Error running Trader Behavior Agent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getRecentTraderSignalsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const signals = await getRecentTraderSignals(limit);

    res.status(200).json(signals);
  } catch (error) {
    console.error("Error fetching Trader Behavior Signals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
    runTraderBehaviorAgentAndSave,
    getRecentTraderSignalsHandler
};

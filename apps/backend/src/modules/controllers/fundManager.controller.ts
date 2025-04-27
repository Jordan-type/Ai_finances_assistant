import { Request, Response } from "express";
import { saveFundStrategy, getActiveStrategies } from "../services/fundStrategy.service";
import { getFundManagerAgent } from "@agents/onchain";

const runFundManagerAndSave = async (req: Request, res: Response) => {
  try {
    const agent = getFundManagerAgent();
    const agentResult = await agent.invoke(req.body);

    const savedStrategy = await saveFundStrategy(agentResult);

    res.status(201).json(savedStrategy);
  } catch (error) {
    console.error("Error running Fund Manager Agent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getActiveFundStrategiesHandler = async (req: Request, res: Response) => {
  try {
    const strategies = await getActiveStrategies();
    res.status(200).json(strategies);
  } catch (error) {
    console.error("Error fetching active Fund Strategies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  runFundManagerAndSave,
  getActiveFundStrategiesHandler
};

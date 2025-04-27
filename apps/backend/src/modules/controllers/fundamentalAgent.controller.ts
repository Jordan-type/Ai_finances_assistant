import { Request, Response } from 'express';
import { saveFundamentalSignal, getLatestFundamentals } from "../services/fundamentalSignal.service";
import { analyzeFundamentals } from "@agents/onchain";

const runFundamentalAgentAndSave = async (req: Request, res: Response) => {
    try {
      
      const agentResult = await analyzeFundamentals(req.body.projectDetails);
      const savedSignal = await saveFundamentalSignal(agentResult);
  
      res.status(201).json(savedSignal);
    } catch (error) {
      console.error("Error running Fundamental Agent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getLatestFundamentalSignals = async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const signals = await getLatestFundamentals(limit);
  
      res.status(200).json(signals);
    } catch (error) {
      console.error("Error fetching Fundamental Signals:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export {
    runFundamentalAgentAndSave,
    getLatestFundamentalSignals
  };

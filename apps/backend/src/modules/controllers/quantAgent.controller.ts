import { Request, Response } from "express";
import { saveQuantSignal, getLatestQuantSignals, getQuantSignalById  } from "../services/quantSignal.service";
import { createQuantAnalystAgent } from "@agents/onchain"; 

const runQuantAgentAndSave = async (req: Request, res: Response) => {
  try {
    const { agent } = await createQuantAnalystAgent();
    const agentResult = await agent.invoke(req.body.repoUrl);

    const savedSignal = await saveQuantSignal(agentResult);

    res.status(201).json(savedSignal);
  } catch (error) {
    console.error("Error running Quant Agent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLatestQuantSignalsHandler = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const signals = await getLatestQuantSignals(limit);
        res.status(200).json(signals);
    } catch (error) {
        console.error("Error fetching latest Quant Signals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getQuantSignalByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const signal = await getQuantSignalById(id);
        res.status(200).json(signal);
    } catch (error) {
        console.error("Error fetching Quant Signal by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { 
    runQuantAgentAndSave,
    getLatestQuantSignalsHandler,
    getQuantSignalByIdHandler
};

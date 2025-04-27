import { Request, Response } from "express";
import { saveSentimentSignal, getLatestSentimentSignals } from "../services/sentimentSignal.service";
import { analyzeSentiment } from "@agents/onchain";

const runSentimentAgentAndSave = async (req: Request, res: Response) => {
  try {
    const agentResult = await analyzeSentiment(req.body);

    const savedSignal = await saveSentimentSignal(agentResult);

    res.status(201).json(savedSignal);
  } catch (error) {
    console.error("Error running Sentiment Agent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLatestSentimentSignalsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const signals = await getLatestSentimentSignals(limit);

    res.status(200).json(signals);
  } catch (error) {
    console.error("Error fetching Sentiment Signals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
    runSentimentAgentAndSave,
    getLatestSentimentSignalsHandler
}

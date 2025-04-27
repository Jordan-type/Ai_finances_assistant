import { Request, Response } from "express";
import { saveRiskReport, getLatestRiskReports } from "../services/riskReport.service";
import { saveFundStrategy } from "../services/fundStrategy.service"; // 👈 new
import { getRiskManagerAgent, getFundManagerAgent } from "@agents/onchain"; // 🧠 both agents

const runRiskManagerAndSave = async (req: Request, res: Response) => {
  try {
    // 1. Run Risk Manager Agent
    const riskAgent = getRiskManagerAgent();
    const riskResult = await riskAgent.invoke(req.body); // req.body expected: quantScore, sentimentScore, fundamentalScore, traderBehaviorSignal

    // Save risk report
    const savedRiskReport = await saveRiskReport(riskResult);

    // 2. (Optional) Run Fund Manager Agent if user goal provided
    let fundStrategyResult = null;
    if (req.body.goal) {
      const fundAgent = getFundManagerAgent();
      fundStrategyResult = await fundAgent.invoke({
        riskLevel: riskResult.riskLevel,
        goal: req.body.goal, // Example: "capital preservation", "growth", etc.
      });

      // Save fund strategy
      await saveFundStrategy(fundStrategyResult);
    }

    // 3. Return response
    res.status(201).json({
      riskReport: savedRiskReport,
      ...(fundStrategyResult && { fundStrategy: fundStrategyResult }),
    });

  } catch (error) {
    console.error("❌ Error running Risk Manager Flow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLatestRiskReportsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const reports = await getLatestRiskReports(limit);

    res.status(200).json(reports);
  } catch (error) {
    console.error("❌ Error fetching Risk Reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export {
  runRiskManagerAndSave,
  getLatestRiskReportsHandler
};

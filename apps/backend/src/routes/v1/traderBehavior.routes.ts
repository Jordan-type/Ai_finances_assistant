import express, { Router, Request, Response, RequestHandler } from "express";
import { runTraderBehaviorAgentAndSave, getRecentTraderSignalsHandler } from "../../modules/controllers/traderBehavior.controller";

const router: Router = Router();

router.post("/trader-behavior/agent", runTraderBehaviorAgentAndSave);
router.get("/trader-behavior/agent", getRecentTraderSignalsHandler);

export default router;
import express, { Router, Request, Response, RequestHandler } from "express";

import { runSentimentAgentAndSave, getLatestSentimentSignalsHandler} from "../../modules/controllers/sentimentAgent.controller";

const router: Router = Router();

router.post("/sentiment/agent", runSentimentAgentAndSave);
router.get("/sentiment/agent", getLatestSentimentSignalsHandler);

export default router;
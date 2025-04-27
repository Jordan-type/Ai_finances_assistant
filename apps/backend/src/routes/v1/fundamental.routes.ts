import express, { Router, Request, Response, RequestHandler } from "express";

import { runFundamentalAgentAndSave, getLatestFundamentalSignals } from "../../modules/controllers/fundamentalAgent.controller";

const router: Router = Router();

router.post("/fundamental/agent", runFundamentalAgentAndSave);
router.get("/fundamental/agent", getLatestFundamentalSignals);

export default router;
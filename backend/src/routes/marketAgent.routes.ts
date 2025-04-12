import { Router } from "express";

import { invokeMarketAgent } from "../modules/marketAgent.controller.js";

const router = Router();

router.post("/market-agent/run", (req, res) => invokeMarketAgent(req, res));

export default router;

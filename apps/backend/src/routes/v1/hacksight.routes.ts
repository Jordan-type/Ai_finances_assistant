import express, { Router, Request, Response, RequestHandler } from "express";
import { invokeChatAgent } from "../../modules/controllers/chatAgent.controller";
import { invokeMarketAgent } from "../../modules/controllers/marketAgent.controller";

const router: Router  = Router();

router.post("/chat-agent/run", invokeChatAgent);
router.post("/market-agent/run", invokeMarketAgent);

export default router;
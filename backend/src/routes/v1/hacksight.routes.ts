import { Router } from "express";
import { invokeChatAgent } from "../../modules/controllers/chatAgent.controller";
import { invokeMarketAgent } from "../../modules/controllers/marketAgent.controller";

const router = Router();

router.post("/chat-agent/run", (req, res) => invokeChatAgent(req, res));
router.post("/market-agent/run", (req, res) => invokeMarketAgent(req, res));

export default router;
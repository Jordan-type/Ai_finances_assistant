import express, { Router, Request, Response, RequestHandler } from "express";
import { runQuantAgentAndSave, getLatestQuantSignalsHandler, getQuantSignalByIdHandler } from '../../modules/controllers/quantAgent.controller';

const router: Router = Router()

// Route to run the Quant Agent and save the result
router.post("/quant-agent/run", runQuantAgentAndSave);
router.get("/quant-agent/latest", getLatestQuantSignalsHandler);
router.get("/quant-agent/:id", getQuantSignalByIdHandler);

export default router;
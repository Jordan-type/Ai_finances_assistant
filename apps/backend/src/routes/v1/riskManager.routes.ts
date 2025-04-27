import express, { Router, Request, Response, RequestHandler } from "express";

import {  runRiskManagerAndSave, getLatestRiskReportsHandler } from "../../modules/controllers/riskManager.controller";

const router: Router = Router();

router.post("/risk-manager/agent", runRiskManagerAndSave);
router.get("/risk-manager/agent", getLatestRiskReportsHandler);

export default router;
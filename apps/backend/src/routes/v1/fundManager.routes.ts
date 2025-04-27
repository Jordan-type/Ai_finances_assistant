import express, { Router, Request, Response, RequestHandler } from "express";

import { runFundManagerAndSave, getActiveFundStrategiesHandler } from "../../modules/controllers/fundManager.controller";

const router: Router = Router();

router.post("/fund-manager/agent", runFundManagerAndSave);
router.get("/fund-manager/agent", getActiveFundStrategiesHandler);

export default router;


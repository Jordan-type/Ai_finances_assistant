import express, { Router, Request, Response, RequestHandler } from "express";

import { createProjectHandler, createHackathonHandler, getProjectByIdHandler, getAllProjectsHandler, updateReviewStatusHandler, searchProjectsHandler,} from "../../modules/controllers/projects.controller";

const router: Router = Router();

router.post("/projects", createProjectHandler);
router.post("/hackathons", createHackathonHandler);
router.get("/projects/:projectId", getProjectByIdHandler);
router.get("/projects", getAllProjectsHandler);
router.put("/projects/review", updateReviewStatusHandler);
router.post("/projects/search", searchProjectsHandler);

export default router;
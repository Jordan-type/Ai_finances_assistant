import express, { Router } from "express"
const routing: Router = express.Router();

import projectRoutes from "./project.routes"
import hackSightRoutes from "./hacksight.routes"
import blockchainRoutes from "./blockchain.routes"


routing.use("/api/v1", projectRoutes)
routing.use("/api/v1", hackSightRoutes)
routing.use("/api/v1", blockchainRoutes)


export default routing
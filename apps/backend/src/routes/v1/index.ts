import express, { Router } from "express"
const routing: Router = express.Router();

import projectRoutes from "./project.routes"
import hackSightRoutes from "./hacksight.routes"
import blockchainRoutes from "./blockchain.routes"
import traderBehaviorRoutes from "./traderBehavior.routes"
import sentimentRoutes from "./sentiment.routes"
import fundamentalRoutes from "./fundamental.routes"
import riskManagerRoutes from "./riskManager.routes"
import fundManagerRoutes from "./fundManager.routes"
import quantAnalystRoutes from "./quantAnalyst.routes"


routing.use("/api/v1", projectRoutes)
routing.use("/api/v1", hackSightRoutes)
routing.use("/api/v1", blockchainRoutes)

routing.use("/api/v1", traderBehaviorRoutes)
routing.use("/api/v1", sentimentRoutes)
routing.use("/api/v1", fundamentalRoutes)
routing.use("/api/v1", riskManagerRoutes)
routing.use("/api/v1", fundManagerRoutes)
routing.use("/api/v1", quantAnalystRoutes)


export default routing
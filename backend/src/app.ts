import express, { Request, Response, RequestHandler } from "express"
import cors from "cors"

// import market agent
import { runMarketAgent } from "./agents/marketAgent";

// routes v1
import { routeV1 } from "./routes/index"

// cors options
const corsOptions = {
    origin: [
        "*",
        "http://localhost:3000",
        "https://hacksight.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
}


// Initialize Express app
const app = express()
const port = process.env.PORT || 3001

app.use(cors(corsOptions)) // use cors middleware
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(express.json()) // parse application/json


// test market 
// const idea = "A decentralized ride-sharing platform for rural Africa using Celo blockchain.";
// const theme = "Decentralization, Ride-sharing, Blockchain for Africa, Mobility, Rural Innovation";
// runMarketAgent(idea, theme).then(answers => console.log(answers));

app.use(routeV1) // use the routes defined in routes/index.ts

// export the app for usage in other modules
export { app };

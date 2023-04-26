// -------------------------- IMPORTS
import "./util/dotenvConfig.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { user_router as router } from "./routes/users.js";

// -------------------------- IMPORTANT CONSTANTS
const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;
const USER_ROUTE = process.env.USER_ROUTE;

// -------------------------- MIDDLEWARE
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// -------------------------- ROUTES
// USER
app.use(API_VERSION + USER_ROUTE, router);

// -------------------------- SERVER LISTEN
app.listen(PORT, () => {
  console.log("Server listen on port:", PORT);
});

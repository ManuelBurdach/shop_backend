// -------------------------- IMPORTS
import "./util/dotenvConfig.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { user_router } from "./routes/users.js";
import cookieParser from "cookie-parser";

// -------------------------- IMPORTANT CONSTANTS
const app = express();
const PORT = process.env.PORT || 10000;
const API_VERSION = process.env.API_VERSION;
const USER_ROUTE = process.env.USER_ROUTE;
const FRONTEND_URL = process.env.FRONTEND_URL;

// -------------------------- MIDDLEWARE
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// -------------------------- ROUTES
// USER - GetAll - getOne - edit - delete - add(register) - login - auth(token) - logout
app.use(API_VERSION + USER_ROUTE, user_router);

// -------------------------- SERVER LISTEN
app.listen(PORT, () => {
  console.log("Server listen on port:", PORT);
});

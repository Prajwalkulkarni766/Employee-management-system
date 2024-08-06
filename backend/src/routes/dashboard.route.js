import { generateStats } from "../controllers/dashboard.controller.js";
import express from "express";
import { restrictTo } from "../middlewares/auth.middleware.js";

const dashboardRoute = express.Router();

// dashboardRoute.get("/", restrictTo("Admin"), generateStats);
dashboardRoute.get("/", generateStats);

export default dashboardRoute;

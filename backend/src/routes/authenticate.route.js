import { login } from "../controllers/login.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";

const authRoute = express.Router();

authRoute.post("/login", checkData("login"), checkErrors, login);

export default authRoute;

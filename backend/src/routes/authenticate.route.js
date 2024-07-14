import { login, signup } from "../controllers/login.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import AppResponse from "../utils/appResponse.js";

const authRoute = express.Router();

authRoute
    .post("/login", checkData("login"), checkErrors, login)
    .post("/signup", signup)
    .use(verifyToken)
    .all("", (req, res)=>{
        return res.status(200).json(new AppResponse(200, "Authorized"));
    });
    

export default authRoute;

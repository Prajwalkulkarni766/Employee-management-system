import {getLeave} from "../controllers/leave.controller.js";
import express from "express";
import { check } from "express-validator";
import checkErrors from "../middlewares/checkErrors.middleware.js";

const leaveRouter = express.Router();

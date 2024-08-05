import {
  setConfiguration,
  getConfiguration,
} from "../controllers/configuration.controller.js";
import express from "express";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";
import checkErrors from "../middlewares/checkErrors.middleware.js";

const configurationRoute = express.Router();

configurationRoute.get("/", getConfiguration).post(
  "/",
  // checkData("configuration"),
  // checkErrors,
  setConfiguration
);

export default configurationRoute;

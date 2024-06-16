import {
  getLeave,
  createLeave,
  updateLeave,
} from "../controllers/leave.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";

const leaveRouter = express.Router();

leaveRouter
  .get("/", getLeave)
  .post("/", checkData("createLeave"), checkErrors, createLeave)
  .patch(
    "/updateLeave",
    restrictTo("admin"),
    checkData("updateLeaveStatus"),
    checkErrors,
    updateLeave
  );

export default leaveRouter;

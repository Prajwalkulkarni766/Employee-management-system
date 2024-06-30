import {
  getAtteandanceOfDate,
  reportInText,
  remarkAsAbsent,
  attendance,
} from "../controllers/attendance.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const attendanceRoute = express.Router();

attendanceRoute
  .get(
    "/",
    checkData("getAtteandanceOfDate"),
    checkErrors,
    getAtteandanceOfDate
  )
  .post("/checkIn", checkData("checkIn"), checkErrors, attendance)
  .post("/checkOut", checkData("checkOut"), checkErrors, attendance)
  .get("/reportInText", checkData("reportInText"), checkErrors, reportInText)
  .patch("/remarkAsAbsent", remarkAsAbsent);

export default attendanceRoute;

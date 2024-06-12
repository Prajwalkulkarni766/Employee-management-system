import {
  clockIn,
  clockOut,
  getAttendanceInfoOfAnyDate,
  reportInText,
  remarkAsAbsent,
} from "../controllers/attendance.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";

const attendanceRoute = express.Router();

attendanceRoute
  .get("/", getAttendanceInfoOfAnyDate)
  .get("/reportInText", checkData("reportInText"), checkErrors, reportInText)
  .post("/clockIn", checkData("clockIn"), checkErrors, clockIn)
  .post("/clockOut", checkData("clockOut"), checkErrors, clockOut)
  .patch("/remarkAsAbsent", remarkAsAbsent);

export default attendanceRoute;

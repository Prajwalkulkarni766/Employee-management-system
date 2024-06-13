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
  .post("/", clockIn)
  .get("/reportInText", checkData("reportInText"), checkErrors, reportInText)
  .patch("/remarkAsAbsent", remarkAsAbsent);

export default attendanceRoute;

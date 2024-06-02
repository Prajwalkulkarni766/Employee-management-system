import {
  clockIn,
  clockOut,
  getAttendanceInfoOfAnyDate,
  // reportInExcel,
  reportInText,
  // remarkAsAbsent,
} from "../controllers/attendance.controller.js";
import express from "express";
import { check } from "express-validator";
import checkErrors from "../middlewares/checkErrors.middleware.js";

const attendanceRoute = express.Router();

attendanceRoute
  .get("/", getAttendanceInfoOfAnyDate)
  .get(
    "/reportInText",
    [
      check("fromDate", "Please provide from date").isISO8601(),
      check("toDate", "Please provide to date").isISO8601(),
    ],
    checkErrors,
    reportInText
  )
  .post(
    "/clockIn",
    [
      check("clockIn")
        .isISO8601()
        .withMessage("Please provide clock in date time"),
      check("clockInCoordinates")
        .notEmpty()
        .withMessage("Please provide clock in coordinates"),
      check("userName")
        .notEmpty()
        .isString()
        .withMessage("Please send userName"),
      check("day").notEmpty().isString().withMessage("Please send day"),
    ],
    checkErrors,
    clockIn
  )
  .post(
    "/clockOut",
    [
      check(
        "attendanceId",
        "Please provide attendance id of clock in"
      ).isMongoId(),
      check("clockOut", "Please provide clock out date time").isISO8601(),
      check(
        "clockOutCoordinates",
        "Please provide clock out coordinates"
      ).notEmpty(),
    ],
    checkErrors,
    clockOut
  );

// .get(
//   "/reportInExcel",
//   [
//     check("fromDate", "Please provide from date").isISO8601(),
//     check("toDate", "Please provide to date").isISO8601(),
//     check("user").optional().isMongoId(),
//   ],
//   checkErrors,
//   reportInExcel
// )
// .patch("/remarkAsAbsent",remarkAsAbsent)

export default attendanceRoute;

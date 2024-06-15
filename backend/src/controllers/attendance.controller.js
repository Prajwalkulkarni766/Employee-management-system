import Attendance from "../models/attendance.model.js";
import moment from "moment";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";

const attendance = catchAsync(async (req, res, next) => {
  let attendanceData = await Attendance.findOne({
    employeeId: req.body.employeeId,
    date: req.body.date,
  });

  if (!attendanceData) {
    // if attendance data not found means this is checkIn
    attendanceData = await new Attendance(req.body).save();
  } else {
    // Existing attendance (check out)
    attendanceData.checkOut = req.body.checkOut;
    attendanceData.calculateWorkingHoursStatus();
    attendanceData = await attendanceData.save();
  }

  return res.status(200).json(new AppResponse(200, attendanceData, undefined));
});

const getAtteandanceOfDate = catchAsync(async (req, res, next) => {
  const date = new Date(req.query.date);
  date.setUTCHours(0, 0, 0, 0);

  console.log(date);

  // get attendance data
  const attendanceData = await Attendance.findOne({
    employee: req.body.empId,
    date: date,
  });

  // if attendance data not found
  if (!attendanceData) {
    return next(new AppError("Data not found", 400));
  }

  return res
    .status(200)
    .json(new AppResponse(200, attendanceData, "Data found"));
});

const reportInText = catchAsync(async (req, res, next) => {
  const { fromDate, toDate } = req.query;

  // finding attendance data to append it in calendar
  const attendanceInfo = await Attendance.find({
    employee: req.body.empId,
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  });

  // formatting response
  const data = attendanceInfo.reduce((acc, info) => {
    const formattedDate = moment(info.date).format("YYYY-MM-DD");
    acc[formattedDate] = info.workingStatus;
    return acc;
  }, {});

  res.send(data);
});

const remarkAsAbsent = catchAsync(async (req, res, next) => {
  // Generate date for which you want to mark absent
  const date = req.query.date ? new Date(req.query.date) : new Date();
  date.setUTCHours(0, 0, 0, 0);
  const day = moment(date).format("dddd");

  const absentEmployeeIds = await Attendance.getAbsentEmployeeIds(date);

  const newAttendanceRecords = absentEmployeeIds.map((employeeId) => ({
    employee: employeeId,
    employeeName: "",
    date,
    workingHours: "00:00",
    workingStatus: "Absent",
    day,
  }));

  await Attendance.insertMany(newAttendanceRecords);

  return res
    .status(200)
    .json(new AppResponse(200, undefined, "Marked absent successfully"));
});

export { getAtteandanceOfDate, reportInText, remarkAsAbsent, attendance };

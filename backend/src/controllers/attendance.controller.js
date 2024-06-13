import Attendance from "../models/attendance.model.js";
import moment from "moment";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";

const clockIn = catchAsync(async (req, res, next) => {
  const { clockIn, clockInCoordinates, employee, empId, day } = req.body;
  const date = new Date(clockIn);
  date.setUTCHours(0, 0, 0, 0);

  // if already clock in
  const attendanceRecord = await Attendance.findOne({
    employee: empId,
    date: date.toISOString(),
  });

  if (attendanceRecord) {
    return next(new AppError("You are already clocked In", 409));
  }

  // saving clock in
  let attendance = await Attendance({
    date: date.toISOString(),
    day,
    employee: empId,
    employeeName: employee.name,
    clockIn,
    clockInCoordinates,
  }).save();

  return res
    .status(201)
    .json(new AppResponse(201, attendance, "Clocked in successfully"));
});

const clockOut = catchAsync(async (req, res, next) => {
  let { attendanceId, clockOut, clockOutCoordinates } = req.body;
  let workingStatus;
  let attendanceData = await Attendance.findById(attendanceId);
  clockOut = new Date(clockOut);

  // if already clock out
  const attendanceRecord = await Attendance.findById(attendanceId);

  if (attendanceRecord.clockOut) {
    return next(new AppError("You are already clocked out", 409));
  }

  // calculating working hours
  let diffMilliseconds = clockOut.getTime() - attendanceData.clockIn.getTime();
  let workingHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
  let workingMinutes = Math.floor(
    (diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  // determining working status
  if (workingHours > 8) {
    workingStatus = "Overtime";
  } else if (workingHours === 8) {
    workingStatus = "Present";
  } else if (workingHours < 8 && workingHours > 5) {
    workingStatus = "Almost Present";
  } else if (workingHours <= 5 && workingHours >= 4) {
    workingStatus = "Half Day";
  } else {
    workingStatus = "Not Considerable";
  }

  // finding attendance and updating it
  let attendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    {
      clockOut,
      clockOutCoordinates,
      workingHours: `${workingHours}:${workingMinutes}`,
      workingStatus,
    },
    { new: true }
  );

  // if attendance not found
  if (!attendance) {
    return next(
      new AppError("Attendance not found so clock in first then clock out", 404)
    );
  }

  return res
    .status(200)
    .json(new AppResponse(200, attendance, "Clocked out successfully"));
});

const attendance = catchAsync(async (req, res, next) => {});

const getAttendanceInfoOfAnyDate = catchAsync(async (req, res, next) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();
  date.setUTCHours(0, 0, 0, 0);

  // get attendance data
  const attendanceData = await Attendance.findOne({
    employee: req.body.empId,
    date: date,
  }).select("clockIn clockOut");

  // if attendance data not found
  if (!attendanceData.clockIn) {
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

export {
  clockIn,
  clockOut,
  getAttendanceInfoOfAnyDate,
  reportInText,
  remarkAsAbsent,
};

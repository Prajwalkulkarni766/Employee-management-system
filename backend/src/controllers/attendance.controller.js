import Attendance from "../models/attendance.model.js";
import moment from "moment";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";
import { getAll } from "../controllers/handlerFactory.js";

const getAllAtteandanceData = getAll(Attendance);

const attendance = catchAsync(async (req, res, next) => {
  req.body.employeeId = req.body.employee.employeeId;

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
  // const date = new Date(req.query.date);
  // date.setUTCHours(0, 0, 0, 0);

  const date = req.query.date;

  // get attendance data
  let attendanceData;

  if (req.role === "Admin") {
    attendanceData = await Attendance.findByIdAndUpdate({
      date: date,
    });

    attendanceData = await Promise.all(
      attendanceData.map(async (data) => {
        data.employee = await Employee.findOne({ employeeId: data.employeeId });
      })
    );
  } else {
    attendanceData = await Attendance.findOne({
      employeeId: req.body.employee.employeeId,
      date: date,
    }).select("-_id");
  }

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
  let attendanceInfo = await Attendance.find({
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  }).select("-__v -_id");

  attendanceInfo = await Promise.all(
    attendanceInfo.map(async (data) => {
      const employee = await Employee.findOne({
        employeeId: data.employeeId,
      }).select(
        "-email -dateOfBirth -education -joiningDate -salary -address -designation -mobileNumber -gender -password -_id -__v"
      );

      return {
        ...data.toObject(),
        ...employee.toObject(),
      };
    })
  );

  res.send(attendanceInfo);
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
  getAtteandanceOfDate,
  reportInText,
  remarkAsAbsent,
  attendance,
  getAllAtteandanceData,
};

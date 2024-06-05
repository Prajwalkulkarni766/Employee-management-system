import Attendance from "../models/attendance.model.js";
import excelJs from "exceljs";
import moment from "moment";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";

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

// const reportInExcel = catchAsync(async (req, res, next) => {
//   let { fromDate, toDate, user } = req.query;

//   // generating workbook
//   let workBook = new excelJs.Workbook();
//   const sheet = workBook.addWorksheet("reports");
//   sheet.columns = [
//     { header: "Sr. no.", key: "srno", width: 8 },
//     { header: "Day", key: "day", width: 12 },
//     { header: "Date", key: "date", width: 13 },
//     { header: "Name", key: "name", width: 30 },
//     { header: "In", key: "in", width: 12 },
//     { header: "Out", key: "out", width: 12 },
//     { header: "Status", key: "status", width: 15 },
//     { header: "Working hours", key: "wh", width: 15 },
//   ];

//   let srNo = 0;

//   const query = {
//     date: {
//       $gte: fromDate,
//       $lte: toDate,
//     },
//   };

//   if (user) {
//     query.user = user;
//   }

//   const attendanceData = await Attendance.find(query).sort("date");

//   for (const data of attendanceData) {
//     let clockInString, clockOutString;

//     if (data?.clockIn) {
//       let hours = data.clockIn.getUTCHours().toString().padStart(2, "0");
//       let minutes = data.clockIn.getUTCMinutes().toString().padStart(2, "0");
//       clockInString = `${hours} : ${minutes}`;
//     }

//     if (data?.clockOut) {
//       let hours = data.clockOut.getUTCHours().toString().padStart(2, "0");
//       let minutes = data.clockOut.getUTCMinutes().toString().padStart(2, "0");
//       clockOutString = `${hours} : ${minutes}`;
//     }

//     // creating row
//     sheet.addRow({
//       srno: ++srNo,
//       day: data?.day,
//       date: data?.date,
//       name: data?.userName,
//       in: clockInString,
//       out: clockOutString,
//       status: data?.workingStatus,
//       wh: data?.workingHours,
//     });
//   }

//   res.setHeader(
//     "Content-Type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   );
//   res.setHeader(
//     "Content-Disposition",
//     `attachment;filename=reports_${Date.now()}.xlsx`
//   );

//   await workBook.xlsx.write(res);
//   res.end();
// });

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

  // Get all employees and attendance records for that date
  const employees = await Employee.find();
  const attendanceDataForThatDate = await Attendance.find({ date });

  for (const employeeData of employees) {
    let userFound = false;

    for (let i = 0; i < attendanceDataForThatDate.length; i++) {
      const attendanceData = attendanceDataForThatDate[i];

      if (attendanceData.user == employeeData._id.toString()) {
        attendanceDataForThatDate.splice(i, 1);
        userFound = true;
        break;
      }
    }

    if (!userFound) {
      const newAttendanceRecord = new Attendance({
        user: employeeData._id,
        userName: employeeData.name,
        date,
        workingHours: "00:00",
        workingStatus: "Absent",
        day,
      });

      // Save the new attendance record
      await newAttendanceRecord.save();
    }
  }

  res.send("ok");
});

export {
  clockIn,
  clockOut,
  getAttendanceInfoOfAnyDate,
  reportInText,
  remarkAsAbsent,
};

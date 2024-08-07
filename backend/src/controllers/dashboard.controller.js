import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Payroll from "../models/payroll.model.js";
import Holiday from "../models/holiday.model.js";
import catchAsync from "../utils/catchAsync.js";
import dayjs from "dayjs";
import AppResponse from "../utils/appResponse.js";

const generateStats = catchAsync(async (req, res, next) => {
  const currentDate = dayjs();

  // card content start

  const totalEmployeeWorking = await Employee.countDocuments({
    role: "Employee",
    isWorking: true,
  });

  const avgWorkingHoursOfPreviousMonth = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(
            currentDate
              .subtract(1, "month")
              .startOf("month" - 1)
              .format("YYYY-MM-DD")
          ),
          $lte: new Date(
            currentDate.subtract(1, "month").endOf("month").format("YYYY-MM-DD")
          ),
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: 1,
        totalWorkingHours: {
          $add: ["$workingHours", { $divide: ["$workingMinutes", 60] }],
        },
      },
    },
    {
      $group: {
        _id: null,
        avgTotalWorkingHours: { $avg: "$totalWorkingHours" },
      },
    },
  ]);

  const result = await Payroll.aggregate([
    {
      $match: {
        payMonth: currentDate.subtract(1, "month").format("MMMM YYYY"),
      },
    },
    { $group: { _id: null, totalNetPay: { $sum: "$netPay" } } },
  ]);

  const totalSalaryExpenditure = result.length > 0 ? result[0].totalNetPay : 0;

  const nextHoliday = await Holiday.findOne({
    date: {
      $gte: new Date(currentDate.format("YYYY-MM-DD")),
    },
  });

  // card content end

  // chart or graph content start

  // avg working hours - last 7 days
  const avgWorkingHoursLastSevenDays = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(currentDate.subtract(7, "day").format("YYYY-MM-DD")),
          $lte: new Date(currentDate.format("YYYY-MM-DD")),
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: 1,
        totalWorkingHours: {
          $add: ["$workingHours", { $divide: ["$workingMinutes", 60] }],
        },
      },
    },
  ]);

  const monthArray = [];

  for (let index = 1; index < 8; index++) {
    const monthNameAndYear = currentDate
      .subtract(index, "month")
      .format("MMMM YYYY");
    monthArray.push(monthNameAndYear);
  }

  // monthly salary distribution - last 7 months
  const monthlySalaryDistibution = await Payroll.aggregate([
    {
      $match: {
        payMonth: {
          $in: monthArray,
        },
      },
    },
    {
      $project: {
        payMonth: 1,
        netPay: 1,
      },
    },
    {
      $group: {
        _id: "$payMonth",
        totalAmountPaid: { $sum: "$netPay" },
      },
    },
    {
      $addFields: {
        date: {
          $dateFromString: {
            dateString: { $concat: ["01 ", "$_id"] },
            format: "%d %B %Y",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        payMonth: "$_id",
        totalAmountPaid: 1,
        date: 1,
      },
    },
    {
      $sort: { date: 1 }, // Sort by date in ascending order
    },
  ]);

  // employee attendance - 10
  const topTenAttendance = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(
            currentDate
              .subtract(1, "month")
              .startOf("month")
              .format("YYYY-MM-DD")
          ),
          $lte: new Date(
            currentDate.subtract(1, "month").endOf("month").format("YYYY-MM-DD")
          ),
        },
      },
    },
    {
      $project: {
        employeeId: 1,
        totalWorkingHours: {
          $add: ["$workingHours", { $divide: ["$workingMinutes", 60] }],
        },
      },
    },
    {
      $group: {
        _id: "$employeeId",
        totalWorkingHours: {
          $avg: "$totalWorkingHours",
        },
      },
    },
    {
      $limit: 10,
    },
  ]);

  const responseObj = {
    totalEmployeeWorking,
    totalSalaryExpenditure,
    nextHoliday,
    avgWorkingHoursOfPreviousMonth: Math.round(
      avgWorkingHoursOfPreviousMonth[0]?.avgTotalWorkingHours || 0
    ),
    avgWorkingHoursLastSevenDays: avgWorkingHoursLastSevenDays || [],
    monthlySalaryDistibution,
    topTenAttendance,
  };

  return res.status(200).json(new AppResponse(200, responseObj, undefined));
});

export { generateStats };

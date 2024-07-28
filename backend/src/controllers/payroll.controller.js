import Payroll from "../models/payroll.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Configuration from "../models/configuration.model.js";

const getEmployeePayrollDataOfSpecifiedMonth = catchAsync(
  async (req, res, next) => {
    const { fromDate, toDate } = req.query;

    let paymentInfo = await Payroll.find({
      payStartDate: fromDate,
      payEndDate: toDate,
    });

    paymentInfo = await Promise.all(
      paymentInfo.map(async (data, index) => {
        const employee = await Employee.findOne({
          employeeId: data.employeeId,
        }).select(
          "firstName lastName department role mobileNumber email salary"
        );

        // Destructure employee fields and spread data fields
        const {
          _id,
          firstName,
          lastName,
          department,
          role,
          mobileNumber,
          email,
          salary,
        } = employee;

        return {
          id: index + 1,
          _id: data._id,
          employeeId: data.employeeId,
          payStartDate: data.payStartDate,
          payEndDate: data.payEndDate,
          payStatus: data.payStatus,
          totalAmountPaid: data.totalAmountPaid,
          deduction: data.deduction,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          __v: data.__v,
          name: firstName + lastName,
          department,
          role,
          mobileNumber,
          email,
          salary,
        };
      })
    );

    // return res.send(paymentInfo);

    return res
      .status(200)
      .json(
        new AppResponse(200, paymentInfo, "Salary info fetched successfully")
      );
  }
);

const generatePayrollSlip = undefined;

const payrollProcess = catchAsync(async (req, res, next) => {
  const { startOfMonth, endOfMonth } = req.body;

  const employees = await Employee.find({
    role: { $eq: "Employee" },
    isWorking: { $eq: true },
  });

  for (const employee of employees) {
    // finding data of payment
    const paymentInfo = await Payroll.findOne({
      employeeId: employee.employeeId,
      payStartDate: startOfMonth,
      payEndDate: endOfMonth,
    });

    // means already paid data
    if (paymentInfo) {
      continue;
    }

    const payment = {
      salary: employee.salary,
      hra: employee.hra,
      da: employee.da,
      specialAllowances: employee.specialAllowances,
    };

    // release payment
    await new Payroll({
      employeeId: employee.employeeId,
      payStartDate: startOfMonth,
      payEndDate: endOfMonth,
      payStatus: "Paid",
      earning: payment,
    }).save();
  }

  return res
    .status(200)
    .json(new AppResponse(200, undefined, "Payment released successfully"));
});

const createPayroll = catchAsync(async (req, res, next) => {
  const configuration = await Configuration.findOne();
  const employeeData = await Employee.find({ role: { $ne: "Admin" } });

  /*
  count total number of days present in month

  remove default holiday (fetched from configuration collection) + declared holiday (fetched from holiday collection)

  count how many days employee is absent count leave also which are not paid

  count how many days employee received late mark

  count how many days employee received less work time


  so now calculate how much salary he / she will receive

  */

  /*
code that gives total  present, ... working hours status

[
  {
    $match: {
      employeeId: "EMP-2",
      date: {
        $gte: ISODate("2024-07-01"),
        $lte: ISODate("2024-07-31")
      }
    }
  },
  {
    $group: {
      _id: "$workingStatus",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      workingStatus: "$_id",
      count: 1
    }
  }
]


  */

  const data = employeeData.map(async (employee) => {
    const attendanceData = await Attendance.find({
      employeeId: employee.employeeId,
      workingHours: { $lt: configuration.totalWorkingHours },
    });
  });

  // const lessWorkTimeData;

  res.send(processData);
});

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  generatePayrollSlip,
  payrollProcess,
  createPayroll,
};

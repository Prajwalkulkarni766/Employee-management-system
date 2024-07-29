import Payroll from "../models/payroll.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Configuration from "../models/configuration.model.js";
import dayjs from "dayjs";
import Holiday from "../models/holiday.model.js";
import Leave from "../models/leave.model.js";

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

const generatePaySlip = catchAsync(async (req, res, next) => {});
/*
TODO:

generate payslip and send html content

*/

const payrollProcess = catchAsync(async (req, res, next) => {
  /*
TODO:

rather than fetching data from employee collection and after doing payroll process

process the payroll data received in request

  */
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
  const { month, year } = req.body;

  // fetching configuration
  const configuration = await Configuration.findOne();

  // calculating total number of days present in month
  const startOfMonth = dayjs(`${year}-${month}-01`);
  const endOfMonth = startOfMonth.endOf("month");
  const totalNumberOfDaysInMonth = endOfMonth.date();

  // remove default holidays from total number of days in month
  const holidaySet = new Set(configuration.holiday);
  let workingDays = 0;
  for (let day = 1; day <= totalNumberOfDaysInMonth; day++) {
    const currentDay = dayjs(`${year}-${month}-${day}`);
    const dayOfWeek = currentDay.format("dddd");
    if (!holidaySet.has(dayOfWeek)) {
      workingDays++;
    }
  }

  // fetching declared holidays and removing it from working days
  const totalNumberOfDeclaredHolidays = await Holiday.countDocuments({
    date: {
      $gte: startOfMonth.format("YYYY-MM-DD"),
      $lte: endOfMonth.format("YYYY-MM-DD"),
    },
  });

  workingDays -= totalNumberOfDeclaredHolidays;

  const employeeData = await Employee.find({ role: { $ne: "Admin" } });

  const payRollData = employeeData.map(async (data) => {
    let workingDaysOfParticularEmployee = workingDays;

    // Fetching total leaves taken by that particular employee within that month
    const leavesTaken = await Leave.countDocuments({
      employeeId: data.employeeId,
      leaveStartDate: { $gte: startOfMonth.format("YYYY-MM-DD") },
      leaveEndDate: { $lte: endOfMonth.format("YYYY-MM-DD") },
      leaveStatus: "Approved",
      isPaid: false,
    });

    // workingDaysOfParticularEmployee -= numberOfTotalLeavesTaken;

    // const workingStatus = await Attendance.aggregate([
    //   {
    //     $match: {
    //       employeeId: data.employeeId,
    //       date: {
    //         $gte: new Date(startOfMonth.format("YYYY-MM-DD")),
    //         $lte: new Date(endOfMonth.format("YYYY-MM-DD")),
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$workingStatus",
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       workingStatus: "$_id",
    //       count: 1,
    //     },
    //   },
    // ]);

    const halfDaysWorking = await Attendance.countDocuments({
      employeeId: data.employeeId,
      date: {
        $gte: new Date(startOfMonth.format("YYYY-MM-DD")),
        $lte: new Date(endOfMonth.format("YYYY-MM-DD")),
      },
      workingStatus: "Half Day",
    });

    const lessWorking = await Attendance.countDocuments({
      employeeId: data.employeeId,
      date: {
        $gte: new Date(startOfMonth.format("YYYY-MM-DD")),
        $lte: new Date(endOfMonth.format("YYYY-MM-DD")),
      },
      workingStatus: {
        $in: ["Almost Present", "Not Considerable"],
      },
    });

    const lateMarking = await Attendance.countDocuments({
      employeeId: data.employeeId,
      date: {
        $gte: new Date(startOfMonth.format("YYYY-MM-DD")),
        $lte: new Date(endOfMonth.format("YYYY-MM-DD")),
      },
      isLate: true,
    });

    const absent = await Attendance.countDocuments({
      employeeId: data.employeeId,
      date: {
        $gte: new Date(startOfMonth.format("YYYY-MM-DD")),
        $lte: new Date(endOfMonth.format("YYYY-MM-DD")),
      },
      workingStatus: "Absent",
    });

    // list of earning
    const basicSalary = data.salary;

    const hra = data.hra;

    const da = data.da;

    const specialAllowances = data.specialAllowances;

    const bonus = 0;

    const totalEarnings = basicSalary + hra + da + specialAllowances + bonus;

    // list of deduction
    const providentFund = 0;

    const totalAmountDeductedBecauseOfAbsense =
      (absent + leavesTaken) * configuration.amountDeductedWhenEmployeeIsAbsent;

    const totalAmountDeductedBecauseOfLessWorkTime =
      lessWorking * configuration.lessWorkTimeDeduction;

    const totalAmountDeductedBecauseOfLateMark =
      lateMarking * configuration.lateMarkDeduction;

    const totalDeductions =
      providentFund +
      totalAmountDeductedBecauseOfAbsense +
      totalAmountDeductedBecauseOfLessWorkTime +
      totalAmountDeductedBecauseOfLateMark;

    return {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      basicSalary,
      hra,
      da,
      specialAllowances,
      bonus,
      totalEarnings,
      providentFund,
      totalAmountDeductedBecauseOfAbsense,
      totalAmountDeductedBecauseOfLessWorkTime,
      totalAmountDeductedBecauseOfLateMark,
      totalDeductions,
      netPay: totalEarnings - totalDeductions,
    };
  });

  const results = await Promise.all(payRollData);

  res.send(results);
});

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  generatePaySlip,
  payrollProcess,
  createPayroll,
};

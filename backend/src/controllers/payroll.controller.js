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

const generatePaySlip = catchAsync(async (req, res, next) => {
  const { employeeId, payMonth } = req.query;

  const configuration = await Configuration.findOne();
  const employee = await Employee.findOne({ employeeId });
  const payroll = await Payroll.findOne({ employeeId, payMonth });

  const paySlipTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      td,
      th {
        border: 1px dotted black;
        padding: 0.5em;
        vertical-align: middle;
        font-family: "Roboto";
        font-size: 11pt;
        background-color: white;
      }
      td,
      th {
        border: none;
      }
      .header {
        text-align: center;
        font-weight: bold;
        color: #000;
        border-bottom: 1px dashed black;
      }
      .header span {
        display: block;
      }
      .section-heading {
        font-weight: bold;
        text-align: left;
        border-bottom: 1px solid black;
      }
      .amount {
        text-align: right;
      }
      .total {
        font-weight: bold;
      }
      .amount,
      .total {
        text-align: right;
      }
      .left-align {
        text-align: left;
      }
      .right-align {
        text-align: right;
      }
      .center-align {
        text-align: center;
        color: #959595;
      }
      .null {
        border: none;
      }
      .note {
        color: #959595;
      }
    </style>
  </head>
  <body>
    <table id="sheet0">
      <thead>
        <tr>
          <th colspan="4" class="header">
            <span style="font-size: 20pt">${configuration.officeName}</span>
            <span style="font-size: 11pt">PaySlip</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr>
          <td class="left-align">Date of Joining : ${employee.joiningDate}</td>
          <td colspan="2" class="null"></td>
          <td class="left">Employee name : ${employee.firstName} ${employee.lastName}</td>
        </tr>
        <tr>
          <td class="left-align">Pay Period : ${payroll.payMonth}</td>
          <td colspan="2" class="null"></td>
          <td class="left-align">Designation : ${employee.designation}</td>
        </tr>
        <tr>
          <td class="left-align">Worked Days : 26</td>
          <td colspan="2" class="null"></td>
          <td class="left-align">Department : ${employee.department}</td>
        </tr>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr class="section-heading earnings">
          <td colspan="3" class="">Earnings</td>
          <td class="amount">Amount</td>
        </tr>
        <tr>
          <td class="left-align">Basic</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.earning.salary}</td>
        </tr>
        <tr>
          <td class="left-align">HRA</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.earning.hra}</td>
        </tr>
        <tr>
          <td class="left-align">DA</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.earning.da}</td>
        </tr>
        <tr>
          <td class="left-align">Special Allowance</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.earning.specialAllowances}</td>
        </tr>
        <tr>
          <td class="left-align">Bonus</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.earning.bonus}</td>
        </tr>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr>
          <td colspan="2" class="null"></td>
          <td class="left-align total">Total Earnings</td>
          <td class="amount total">${payroll.earning.totalEarnings}</td>
        </tr>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr class="section-heading">
          <td colspan="3" class="deductions">Deductions</td>
          <td class="amount">Amount</td>
        </tr>
        <tr>
          <td class="left-align">Provident Fund</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.deduction.providentFund}</td>
        </tr>
        <tr>
          <td class="left-align">Late Mark</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.deduction.lateMark}</td>
        </tr>
        <tr>
          <td class="left-align">Less Work Time</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.deduction.lessWorkMinute}</td>
        </tr>
        <tr>
          <td class="left-align">Half Day</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">0</td>
        </tr>
        <tr>
          <td class="left-align">Absent or Leave</td>
          <td class="null"></td>
          <td class="null"></td>
          <td class="amount">${payroll.deduction.absent}</td>
        </tr>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr>
          <td colspan="2" class="null"></td>
          <td class="left-align total">Total Deductions</td>
          <td class="amount total">${payroll.deduction.totalDeduction}</td>
        </tr>
        <tr>
          <td colspan="2" class="null"></td>
          <td class="left-align total">Net Pay</td>
          <td class="amount total">${payroll.netPay}</td>
        </tr>
        <tr>
          <td colspan="4" class="null"></td>
        </tr>
        <tr>
          <td colspan="4" class="left-align note">
            *Note : This is a system generated payslip
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

  res.send(paySlipTemplate);
});

const payrollProcess = catchAsync(async (req, res, next) => {
  const { payMonth, payRollData } = req.body;

  await Promise.all(
    payRollData.map(async (data) => {
      await new Payroll({
        employeeId: data.employeeId,
        payMonth: payMonth,
        earning: {
          salary: data.basicSalary,
          hra: data.hra,
          da: data.da,
          specialAllowances: data.specialAllowances,
          bonus: data.bonus,
          totalEarnings: data.totalEarnings,
        },
        deduction: {
          providentFund: data.providentFund,
          lateMark: data.totalAmountDeductedBecauseOfLateMark,
          lessWorkMinute: data.totalAmountDeductedBecauseOfLessWorkTime,
          absent: data.totalAmountDeductedBecauseOfAbsense,
          totalDeduction: data.totalDeductions,
        },
        netPay: data.netPay,
      }).save();
    })
  );

  return res
    .status(200)
    .json(new AppResponse(200, undefined, "Payment released successfully"));
});

const createPayroll = catchAsync(async (req, res, next) => {
  const { month, year } = req.query;

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

    const totalAmountDeductedBecauseOfHalfDay =
      halfDaysWorking * configuration.halfDayDeduction;

    const totalDeductions =
      providentFund +
      totalAmountDeductedBecauseOfAbsense +
      totalAmountDeductedBecauseOfLessWorkTime +
      totalAmountDeductedBecauseOfLateMark +
      totalAmountDeductedBecauseOfHalfDay;

    return {
      employeeId: data.employeeId,
      employeeName: data.firstName + " " + data.lastName,
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
      totalAmountDeductedBecauseOfHalfDay,
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

import Payroll from "../models/payroll.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";

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

    // release payment
    await new Payroll({
      employeeId: employee.employeeId,
      payStartDate: startOfMonth,
      payEndDate: endOfMonth,
      payStatus: "Paid",
      totalAmountPaid: employee.salary,
    }).save();
  }

  return res
    .status(200)
    .json(new AppResponse(200, undefined, "Payment released successfully"));
});

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  generatePayrollSlip,
  payrollProcess,
};

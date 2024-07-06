import Payroll from "../models/payroll.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";

const getEmployeePayrollDataOfSpecifiedMonth = catchAsync(
  async (req, res, next) => {
    res.send("ok");
  }
);

const generatePayrollSlip = undefined;

const payrollProcess = catchAsync(async (req, res, next) => {
  const salary = await new Payroll(req.body).save();
  return res
    .status(200)
    .json(new AppResponse(200, salary, "Salary paid successfully"));
});

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  generatePayrollSlip,
  payrollProcess,
};

import Leave from "../models/leave.model";
import Attendance from "../models/attendance.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppResponse from "../utils/appResponse";

const getEmployeePayrollDataOfSpecifiedMonth = catchAsync(
  async (req, res, next) => {
    const { month, year } = req.query;

    
  }
);

const employeeSalaryCalculator = undefined;

const generatePayrollSlip = undefined;

const payrollProcess = undefined;

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  employeeSalaryCalculator,
  generatePayrollSlip,
  payrollProcess,
};

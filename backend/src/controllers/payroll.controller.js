import Leave from "../models/leave.model";
import Attendance from "../models/attendance.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppResponse from "../utils/appResponse";

const getEmployeePayrollDataOfSpecifiedMonth = catchAsync(
  async (req, res, next) => {
    res.send("ok");
  }
);

const generatePayrollSlip = undefined;

const payrollProcess = undefined;

export {
  getEmployeePayrollDataOfSpecifiedMonth,
  generatePayrollSlip,
  payrollProcess,
};

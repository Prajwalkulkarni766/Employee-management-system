import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const verifyToken = catchAsync(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(new AppError("Unauthorized request", 401));
  }
  const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

  const employee = await Employee.findOne({ employeeId: id });
  if (!employee) {
    return next(new AppError("Unauthorized request", 401));
  }
  // req.body.employeeId = employee.employeeId;

  // append employee id when request received from employee
  if (employee.role === "Employee") {
    req.query.employeeId = employee.employeeId;
  }
  req.body.employee = employee;
  req.role = employee.role;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export { verifyToken, restrictTo };

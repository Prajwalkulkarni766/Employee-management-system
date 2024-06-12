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
  const id = jwt.verify(token, process.env.TOKEN_SECRET);
  const employee = await Employee.findById(id);
  if (!employee) {
    return next(new AppError("Unauthorized request", 401));
  }
  req.body.empId = id;
  req.body.employee = employee;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export { verifyToken, restrictTo };

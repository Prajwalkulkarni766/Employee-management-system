import catchAsync from "../utils/catchAsync.js";
import Employee from "../models/employee.model.js";
import AppResponse from "../utils/appResponse.js";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  let employee = await Employee.findOne({
    email: email,
  }).select("+password");

  if (!employee || !(await bcrypt.compare(password, employee.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  const token = signToken(employee.employeeId);

  employee.password = undefined;

  return res
    .status(200)
    .cookie("Authorization", "Bearer " + token, {
      httpOnly: true,
      secure: true,
    })
    .json(new AppResponse(200, { employee, token }, "Login successfully"));
});

export { login };

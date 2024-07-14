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

  console.log((await bcrypt.compare(password, employee.password)))

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

const signup = catchAsync(async (req, res, next) => {

  let employee = new  Employee(req.body);

  await employee.save();

  return res
    .status(201)
    .json(new AppResponse(200, undefined, "Signup successfully"));
});


export { login,signup };

import generateToken from "../utils/token.js";
import catchAsync from "../utils/catchAsync.js";
import Employee from "../models/employee.model.js";
import AppResponse from "../utils/appResponse.js";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";

const login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  let employee = await Employee.findOne({
    email: email,
  });

  if (!employee) {
    return next(new AppError("Employee not found", 404));
  }

  const passwordCheckResult = await bcrypt.compare(password, employee.password);

  if (!passwordCheckResult) {
    return next(new AppError("Wrong credentials", 404));
  }
  employee["password"] = undefined;

  const token = generateToken(employee._id);

  return res
    .status(200)
    .cookie("Authorization", token, { httpOnly: true, secure: true })
    .json(new AppResponse(200, { employee, token }, "Login successfully"));
});

export { login };

import Employee from "../models/employee.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppResponse from "../utils/appResponse.js";
import AppError from "../utils/appError.js";
import fs, { unlink } from "fs";

const getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.find(req.query);
  return res.status(200).json(new AppResponse(200, employee));
});

const createSendToken = catchAsync(async (req, res, next) => {});

const createEmployee = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const employee = await Employee.findOne({ email: email });

  if (employee) {
    return next(new AppError("Please provide another email address", 409));
  }

  req.body.image = req.file ? req.file.path : undefined;
  const newEmployee = await new Employee(req.body).save();

  newEmployee.password = undefined;
  newEmployee._id = undefined;

  return res
    .status(201)
    .json(new AppResponse(201, newEmployee, "User registered successfully"));
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const { employeeId } = req.body;

  const employee = await Employee.findOneAndUpdate({ employeeId }, req.body, {
    new: true,
  });

  if (!employee) {
    return next(new AppError("Employee does not exists", 400));
  }

  // if (req.file && req.file.path) {
  //   if (employee.image) {
  //     fs.unlinkSync(employee.image);
  //   }
  //   employee.image = req.file.path;
  // }

  employee._id = undefined;

  return res
    .status(200)
    .json(new AppResponse(200, employee, "Employee updated successfully"));
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const { employeeId } = req.body;

  const employee = await Employee.findOneAndDelete({ employeeId });

  if (!employee) {
    return next(new AppError("Employee not found", 400));
  }

  if (employee.image) {
    fs.unlinkSync(employee.image);
  }

  return res
    .status(204)
    .send(new AppResponse(204, undefined, "Employee deleted successfully"));
});

export { getEmployee, createEmployee, updateEmployee, deleteEmployee };

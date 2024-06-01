import Employee from "../models/employee.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import catchAsync from "../utils/catchAsync.js";
import AppResponse from "../utils/appResponse.js";
import AppError from "../utils/appError.js";

const getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.find();
});

const createEmployee = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    dateOfBirth,
    mobileNumber,
    gender,
    education,
    jobTitle,
    department,
    joiningDate,
    salary,
    additionalData,
  } = req.body;

  const imageUrl = req.file ? req.file.path : undefined;

  const employee = await Employee.find({ email: email });

  if (employee.length > 0) {
    return next(new AppError("Please provide another email address", 409));
  }

  const newEmployee = await new Employee({
    name,
    email,
    dateOfBirth,
    mobileNumber,
    gender,
    education,
    jobTitle,
    department,
    joiningDate,
    salary,
    additionalData,
    imageUrl,
  }).save();

  return res
    .status(201)
    .json(new AppResponse(201, newEmployee, "User registered Successfully"));
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const { empId, name, email, mobileNumber, designation, gender, course } =
    req.body;

  const employee = await Employee.findById(empId);

  if (!employee) {
    return next(new AppError("Employee does not exists", 400));
  }

  // updating the data
  employee.name = name || employee.name;
  employee.email = email || employee.email;
  employee.mobileNumber = mobileNumber || employee.mobileNumber;
  employee.designation = designation || employee.designation;
  employee.gender = gender || employee.gender;
  employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
  employee.education = education || employee.education;
  employee.jobTitle = jobTitle || employee.jobTitle;
  employee.department = department || employee.department;
  employee.joiningDate = joiningDate || employee.joiningDate;
  employee.salary = salary || employee.salary;
  employee.additionalData = additionalData || employee.additionalData;
  if (req.file && req.file.path) {
    if (employee.imageUrl) {
      const status = await deleteImage(employee.imageUrl);
      console.log(status);
      if (!status) {
        return next(new AppError("Problem while deleting previous image", 400));
      }
    }
    employee.imageUrl = req.file.path;
  }

  await employee.save();

  return res
    .status(200)
    .json(new AppResponse(200, employee, "Employee updated successfully"));
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const { empId } = req.body;

  const employee = await Employee.findByIdAndDelete(empId);

  if (!employee) {
    return next(new AppError("Employee not found", 400));
  }

  const status = await deleteImage(employee.imageUrl);
  // if (!status) {
  //   return sendResponse(
  //     res,
  //     400,
  //     false,
  //     "Problem while deleting previous image"
  //   );
  // }

  return res
    .status()
    .send(new AppResponse(204, undefined, "Employee deleted successfully"));
});

export { getEmployee, createEmployee, updateEmployee, deleteEmployee };

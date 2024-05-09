import Employee from "../models/employee.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import { sendResponse } from "../utils/response.js";

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    return sendResponse(res, 200, true, "Data of employee", employee);
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, mobileNumber, designation, gender, course } = req.body;

    if (
      !name ||
      !email ||
      !mobileNumber ||
      !designation ||
      !gender ||
      !course
    ) {
      return sendResponse(
        res,
        401,
        false,
        "Provide name, email, mobileNumber, designation, gender and course all these field"
      );
    }

    const employee = await Employee.find({ email: email });
    if (employee.length > 0) {
      return sendResponse(res, 401, false, "Provide unique email address");
    }

    let newEmployee = new Employee({
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      designation: designation,
      gender: gender,
      course: course,
      imageUrl: `${req.file.path}` || "",
    });

    newEmployee = await newEmployee.save();

    return sendResponse(
      res,
      201,
      true,
      "Employee created successfully",
      newEmployee
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { empId, name, email, mobileNumber, designation, gender, course } =
      req.body;

    if (!empId) {
      return sendResponse(res, 400, false, "Provide employee id");
    }

    const employee = await Employee.findById(empId);

    if (!employee) {
      return sendResponse(res, 400, false, "Employee does not exists");
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobileNumber = mobileNumber || employee.mobileNumber;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    if (req.file && req.file.path) {
      if (employee.imageUrl) {
        const status = await deleteImage(employee.imageUrl);
        console.log(status);
        if (!status) {
          return sendResponse(
            res,
            400,
            false,
            "Problem while deleting previous image"
          );
        }
      }
      employee.imageUrl = req.file.path;
    }

    await employee.save();

    return sendResponse(
      res,
      200,
      true,
      "Employee updated successfully",
      employee
    );
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Server error");
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.query;

    if (!empId) {
      return sendResponse(res, 400, false, "Provide employee id");
    }

    const employee = await Employee.findByIdAndDelete(empId);

    if (!employee) {
      return sendResponse(res, 400, false, "Provided employee not found");
    }

    const status = await deleteImage(employee.imageUrl);
    if (!status) {
      return sendResponse(
        res,
        400,
        false,
        "Problem while deleting previous image"
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Employee deleted successfully",
      employee
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};

export { getEmployee, createEmployee, updateEmployee, deleteEmployee };

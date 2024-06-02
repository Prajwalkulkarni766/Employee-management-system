import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.js";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import { check } from "express-validator";

const employeeRoute = Router();

employeeRoute
  .get("/getEmployee", getEmployee)
  .post(
    "/",
    upload.single("image"),
    [
      check("name")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data name"),
      check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please provide required data email"),
      check("dateOfBirth")
        .isDate()
        .withMessage("Please provide required data dateOfBirth"),
      check("mobileNumber")
        .notEmpty()
        .isNumeric()
        .withMessage("Please provide required data mobileNumber"),
      check("gender")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data gender"),
      check("jobTitle")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data jobTitle"),
      check("department")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data department"),
      check("joiningDate")
        .notEmpty()
        .isDate()
        .withMessage("Please provide required data joiningDate"),
      check("salary")
        .notEmpty()
        .isNumeric()
        .withMessage("Please provide required data salary"),
      check("password")
        .notEmpty()
        .withMessage("Please provide required data password"),
    ],
    checkErrors,
    createEmployee
  )
  .patch(
    "/",
    upload.single("image"),
    [
      check("empId")
        .notEmpty()
        .isMongoId()
        .withMessage("Please provide required data"),
    ],
    checkErrors,
    updateEmployee
  )
  .delete(
    "/",
    [
      check("empId")
        .notEmpty()
        .isMongoId()
        .withMessage("Please provide required data"),
    ],
    checkErrors,
    deleteEmployee
  );

export default employeeRoute;

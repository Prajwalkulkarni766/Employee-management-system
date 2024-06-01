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

const router = Router();

router
  .get("/getEmployee", getEmployee)
  .post(
    "/",
    upload.single("image"),
    [
      check("name")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data"),
      check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please provide required data"),
      check("dateOfBirth").isDate().withMessage("Please provide required data"),
      check("mobileNumber")
        .notEmpty()
        .isNumeric()
        .withMessage("Please provide required data"),
      check("gender")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data"),
      check("jobTitle")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data"),
      check("department")
        .notEmpty()
        .isString()
        .withMessage("Please provide required data"),
      check("joiningDate")
        .notEmpty()
        .isDate()
        .withMessage("Please provide required data"),
      check("salary")
        .notEmpty()
        .isNumeric()
        .withMessage("Please provide required data"),
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
        .withMessage("Please provide valid employee"),
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
        .withMessage("Please provide valid employee"),
    ],
    checkErrors,
    deleteEmployee
  );

export default router;

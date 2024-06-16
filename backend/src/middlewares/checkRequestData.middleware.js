import { check } from "express-validator";

function checkData(routeName) {
  const checks = {
    login: [
      check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please provide a valid email address"),
      check("password").notEmpty().withMessage("Please provide your password"),
    ],
    createEmployee: [
      check("firstName").notEmpty().withMessage("Please provide a first name"),
      check("gender").notEmpty().withMessage("Please provide a gender"),
      check("mobileNumber")
        .notEmpty()
        .withMessage("Please provide a mobile number"),
      check("password").notEmpty().withMessage("Please provide your password"),
      check("department")
        .notEmpty()
        .withMessage("Please provide your department"),
      check("email").isEmail().withMessage("Please provide your email"),
      check("dateOfBirth")
        .isDate()
        .withMessage("Please provide your dateOfBirth"),
      check("joiningDate")
        .isDate()
        .withMessage("Please provide your joining date"),
      check("salary").notEmpty().withMessage("Please provide your salary"),
    ],
    reportInText: [
      check("fromDate", "Please provide from date").isISO8601(),
      check("toDate", "Please provide to date").isISO8601(),
    ],
    checkIn: [
      [
        check("checkIn")
          .isISO8601()
          .withMessage("Please provide check in date time"),
        check("day").notEmpty().isString().withMessage("Please send day"),
        check("date").notEmpty().isDate().withMessage("Please send date"),
      ],
    ],
    checkOut: [
      [
        check("checkOut")
          .isISO8601()
          .withMessage("Please provide check out date time"),
        check("date").notEmpty().isDate().withMessage("Please send date"),
      ],
    ],
    employeeId: [
      check("employeeId")
        .notEmpty()
        .withMessage("Please provide required data"),
    ],
    getAtteandanceOfDate: [
      check("date").isDate().withMessage("Please provide date"),
    ],
    createLeave: [
      check("leaveType").notEmpty().withMessage("Please provide leave type"),
      check("leaveReason")
        .notEmpty()
        .withMessage("Please provide leave reason"),
      check("leaveStartDate")
        .isDate()
        .withMessage("Please provide leave start date"),
      check("leaveEndDate")
        .isDate()
        .withMessage("Please provide leave end date"),
    ],
    updateLeaveStatus: [
      check("leaveId").isMongoId().withMessage("Please provide valid leave id"),
    ],
  };

  return checks[routeName] || [];
}

export default checkData;

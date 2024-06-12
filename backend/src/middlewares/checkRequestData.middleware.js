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
    clockIn: [
      [
        check("clockIn")
          .isISO8601()
          .withMessage("Please provide clock in date time"),
        check("clockInCoordinates")
          .notEmpty()
          .withMessage("Please provide clock in coordinates"),
        check("day").notEmpty().isString().withMessage("Please send day"),
      ],
    ],
    clockOut: [
      [
        check(
          "attendanceId",
          "Please provide attendance id of clock in"
        ).isMongoId(),
        check("clockOut", "Please provide clock out date time").isISO8601(),
        check(
          "clockOutCoordinates",
          "Please provide clock out coordinates"
        ).notEmpty(),
      ],
    ],
    employeeId: [
      check("employeeId")
        .notEmpty()
        .withMessage("Please provide required data"),
    ],
  };

  return checks[routeName] || [];
}

export default checkData;

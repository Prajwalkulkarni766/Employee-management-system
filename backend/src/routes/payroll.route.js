import {
  getEmployeePayrollDataOfSpecifiedMonth,
  payrollProcess,
  createPayroll,
  generatePaySlip,
} from "../controllers/payroll.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const payrollRoute = express.Router();

payrollRoute
  .use(restrictTo("Admin"))
  .get(
    "/",
    checkData("getAllPayroll"),
    checkErrors,
    getEmployeePayrollDataOfSpecifiedMonth
  )
  .post("/", payrollProcess)
  .get("/generatePaySlip", generatePaySlip)
  .get(
    "/createPayroll",
    checkData("createPayroll"),
    checkErrors,
    createPayroll
  );

export default payrollRoute;

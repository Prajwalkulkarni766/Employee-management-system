import {
  getEmployeePayrollDataOfSpecifiedMonth,
  payrollProcess,
  createPayroll,
} from "../controllers/payroll.controller.js";
import express from "express";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const payrollRoute = express.Router();

payrollRoute
  .use(restrictTo("Admin"))
  .get("/", getEmployeePayrollDataOfSpecifiedMonth)
  .post("/", payrollProcess)
  .get("/createPayroll", createPayroll);

export default payrollRoute;

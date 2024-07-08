import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  isExistEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.js";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const employeeRoute = Router();

employeeRoute
  .get("/", restrictTo("Admin"), getEmployee)
  .post(
    "/",
    restrictTo("Admin"),
    upload.single("image"),
    checkData("createEmployee"),
    checkErrors,
    isExistEmployee,
    createEmployee
  )
  .use(restrictTo("Admin", "Employee"))
  .patch(
    "/",
    upload.single("image"),
    checkData("employeeId"),
    checkErrors,
    updateEmployee
  )
  .use(restrictTo("Admin"))
  .delete("/", checkData("employeeId"), checkErrors, deleteEmployee);

export default employeeRoute;

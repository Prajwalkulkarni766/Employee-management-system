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
  .get("/", restrictTo("admin"), getEmployee)
  .post(
    "/",
    restrictTo("admin"),
    upload.single("image"),
    checkData("createEmployee"),
    checkErrors,
    isExistEmployee,
    createEmployee
  )
  .use(restrictTo("admin", "employee"))
  .patch("/", checkData("employeeId"), checkErrors, updateEmployee)
  .use(restrictTo("admin"))
  .delete("/", checkData("employeeId"), checkErrors, deleteEmployee);

export default employeeRoute;

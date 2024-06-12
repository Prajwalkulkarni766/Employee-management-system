import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.js";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { verifyToken, restrictTo } from "../middlewares/auth.middleware.js";

const employeeRoute = Router();

employeeRoute
  .get("/", restrictTo("admin"), getEmployee)
  .post(
    "/",
    restrictTo("admin"),
    upload.single("image"),
    checkData("createEmployee"),
    checkErrors,
    createEmployee
  )
  .use(verifyToken)
  .use(restrictTo("admin", "user"))
  .patch(
    "/",
    // upload.single("image"),
    checkData("employeeId"),
    checkErrors,
    updateEmployee
  )
  .use(restrictTo("admin"))
  .delete("/", checkData("employeeId"), checkErrors, deleteEmployee);

export default employeeRoute;

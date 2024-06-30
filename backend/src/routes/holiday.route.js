import { Router } from "express";
import {
  getHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday,
  isExistHoliday,
} from "../controllers/holiday.controller.js";
import checkErrors from "../middlewares/checkErrors.middleware.js";
import checkData from "../middlewares/checkRequestData.middleware.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const holidayRoute = Router();

holidayRoute
  .get("/", getHoliday)
  .use(restrictTo("Admin"))
  .post(
    "/",
    checkData("createHoliday"),
    checkErrors,
    isExistHoliday,
    createHoliday
  )
  .patch("/", checkData("holidayId"), checkErrors, updateHoliday)
  .delete("/", checkData("holidayId"), checkErrors, deleteHoliday);

export default holidayRoute;

import { login } from "../controllers/login.controller.js";
import express from "express";
import { check } from "express-validator";
import checkErrors from "../middlewares/checkErrors.middleware.js";

const authRoute = express.Router();

authRoute.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .isEmail()
      .withMessage("Please provide required data"),
    check("password").notEmpty().withMessage("Please provide required data"),
  ],
  checkErrors,
  login
);

export default authRoute;

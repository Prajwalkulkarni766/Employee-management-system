import { validationResult } from "express-validator";
import AppError from "../utils/appError.js";

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => {
        return error.msg;
      })
      .join(", ");
    return next(new AppError(messages, 400));
  }
  next();
};

export default checkErrors;

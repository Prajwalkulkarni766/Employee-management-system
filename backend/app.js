import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// whitelist api params
app.use((req, res, next) => {
  const allowedParams = [
    "employeeId",
    "firstName",
    "designation",
    "department",
    "date",
    "fromDate",
    "toDate",
  ];

  const unknownParams = Object.keys(req.query).filter(
    (param) => !allowedParams.includes(param)
  );
  if (unknownParams.length > 0) {
    return next(
      new AppError("You are trying to do HTTP Parameter Pollution", 400)
    );
  }
  next();
});

//middleware import
import globalErrorHandler from "./src/controllers/error.controller.js";
import { verifyToken } from "./src/middlewares/auth.middleware.js";

//routes import
import authenticateRoute from "./src/routes/authenticate.route.js";
import employeeRoute from "./src/routes/employee.route.js";
import attendanceRoute from "./src/routes/attendance.route.js";
import AppError from "./src/utils/appError.js";

//routes declaration
app.use("/api/v1/auth", authenticateRoute);
app.use(verifyToken);
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/attendance", attendanceRoute);

app.use(globalErrorHandler);

export { app };

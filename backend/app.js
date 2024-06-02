import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

//middleware import
import globalErrorHandler from "./src/controllers/error.controller.js";
import verifyToken from "./src/middlewares/auth.middleware.js";

//routes import
import authenticateRoute from "./src/routes/authenticate.route.js";
import employeeRoute from "./src/routes/employee.route.js";
import attendanceRoute from "./src/routes/attendance.route.js";

//routes declaration
app.use("/api/v1/auth", authenticateRoute);
// app.use(verifyToken)
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/attendance", attendanceRoute);

app.use(globalErrorHandler);

export { app };

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

//routes import
import authenticateRoute from "./src/routes/authenticate.route.js";
import employeeRoute from "./src/routes/employee.route.js";
import globalErrorHandler from "./src/controllers/error.controller.js";

//routes declaration
app.use("/api/v1/auth", authenticateRoute);
app.use("/api/v1/employee", employeeRoute);

app.use(globalErrorHandler);

export { app };

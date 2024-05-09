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

//routes declaration
app.use("/api/v1/", authenticateRoute);
app.use("/api/v1/", employeeRoute);

export { app };

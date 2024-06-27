import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/auth/auth.slice.js";
import employeeReducer from "../features/employee/employee.slice.js";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    employee: employeeReducer,
  },
});

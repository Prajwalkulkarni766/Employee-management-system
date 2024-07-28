import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../redux/auth/index.slice.js";
import employeeReducer from "../redux/employee/index.slice.js";
import holidayReducer from "../redux/holiday/index.slice.js";
import loadingReducer from "../redux/loading/index.slice.js";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    employee: employeeReducer,
    holiday: holidayReducer,
    loading: loadingReducer,
  },
});

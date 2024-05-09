import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/auth/auth.slice.js";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

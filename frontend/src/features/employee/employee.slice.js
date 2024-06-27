import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee(state, action) {
      state.employee = action.payload;
    },
    removeEmployee(state) {
      state.employee = null;
    },
  },
});

export const { setEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;

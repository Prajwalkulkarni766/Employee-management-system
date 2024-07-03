import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action) {
      const { employeeId } = action.payload;
      const employeeIndex = state.employees.findIndex(
        (emp) => emp.employeeId === employeeId
      );
      if (employeeIndex !== -1) {
        state.employees[employeeIndex] = {
          ...state.employees[employeeIndex],
          ...action.payload,
        };
      }
    },
    removeEmployee(state, action) {
      const employeeId = action.payload;
      const employeeIndex = state.employees.findIndex(
        (emp) => emp.id === employeeId
      );

      if (employeeIndex !== -1) {
        state.employees.splice(employeeIndex, 1);
      }
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, removeEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;

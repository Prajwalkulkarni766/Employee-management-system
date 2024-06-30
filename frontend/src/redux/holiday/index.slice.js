import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holiday: {},
};

const holidaySlice = createSlice({
  name: "holiday",
  initialState,
  reducers: {
    setHoliday(state, action) {
      state.holiday = action.payload;
    },
    removeHoliday(state) {
      state.holiday = null;
    },
  },
});

export const { setHoliday, removeHoliday } = holidaySlice.actions;
export default holidaySlice.reducer;

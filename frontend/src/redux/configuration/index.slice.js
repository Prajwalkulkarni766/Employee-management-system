import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configuration: {},
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setConfiguration(state, action) {
      state.configuration = action.payload;
    },
    removeConfiguration(state) {
      state.configuration = null;
    },
  },
});

export const { setConfiguration, removeConfiguration } =
  configurationSlice.actions;
export default configurationSlice.reducer;

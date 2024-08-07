import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function MyTimePicker({ labelName, inputId, value, onChange, defaultValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        id={inputId}
        value={value}
        onChange={onChange}
        label={labelName}
        defaultValue={defaultValue}
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
}

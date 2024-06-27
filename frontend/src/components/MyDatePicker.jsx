import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MyDatePicker({
  inputId,
  labelName,
  onBlur,
  value,
  onChange,
  errors,
  isTouched,
}) {
  const handleDateChange = (date) => {
    onChange({
      target: {
        id: inputId,
        value: date,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id={inputId}
        label={labelName}
        onBlur={onBlur}
        value={value}
        onChange={handleDateChange}
        required
        sx={{ width: "100%" }}
        disableFuture
        format="DD/MM/YYYY"
      />
      {isTouched && errors ? <p className="error-text">{errors}</p> : null}
    </LocalizationProvider>
  );
}

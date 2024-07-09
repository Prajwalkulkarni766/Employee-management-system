import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Paper } from "@mui/material";

export default function MyYearPicker({ selectedYear, setSelectedYear }) {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year"]}
          label="Select Year"
          value={selectedYear}
          onChange={setSelectedYear}
          inputFormat="yyyy"
          renderInput={(params) => <TextField {...params} />}
          disableFuture
        />
      </LocalizationProvider>
    </Paper>
  );
}

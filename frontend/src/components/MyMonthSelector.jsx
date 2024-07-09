import * as React from "react";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function MyMonthSelector({
  selectedYear,
  selectedMonth,
  setSelectedMonth,
  setSelectedYear,
}) {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Month"}
          openTo="month"
          views={["year", "month"]}
          value={dayjs(`${selectedYear}-${selectedMonth}-01`)}
          onChange={(newValue) => {
            setSelectedMonth(newValue.month() + 1);
            setSelectedYear(newValue.year());
          }}
          disableFuture
        />
      </LocalizationProvider>
    </Paper>
  );
}

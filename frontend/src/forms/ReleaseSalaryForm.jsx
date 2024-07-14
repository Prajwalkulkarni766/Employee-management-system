import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import Button from "@mui/material/Button";
import axiosInstance from "../axios/axiosInstance";
import { Box, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ReleaseSalaryForm() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const salarySchema = Yup.object({
    payMonth: Yup.date().required("Payment of which month is required"),
  });

  const formik = useFormik({
    initialValues: {
      payMonth: dayjs(`${selectedYear}-${selectedMonth}-01`),
    },
    validationSchema: salarySchema,
    onSubmit: async (values) => {
      try {
        const month = values.payMonth.$M+1;
        const year = values.payMonth.$y;

        const startOfMonth = dayjs(`${year}-${month}-01`)
          .startOf("month")
          .format("YYYY-MM-DD");
        const endOfMonth = dayjs(`${year}-${month}-01`)
          .endOf("month")
          .format("YYYY-MM-DD");

        const response = await axiosInstance.post("/v1/payroll", {
          startOfMonth,
          endOfMonth,
        });

        if (response.status === 200) {
          Toast.success("Payment released successfully");
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
  });

  return (
    <Paper elevation={3} sx={{ width: "100%" }}>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, p: 2 }}
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Month"}
              openTo="month"
              views={["year", "month"]}
              value={formik.values.payMonth}
              onChange={(newValue) => {
                setSelectedMonth(newValue.month() + 1);
                setSelectedYear(newValue.year());
              }}
            />
          </LocalizationProvider>
        </Box>
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          Release Salary of Selected Month
        </Button>
      </Box>
    </Paper>
  );
}

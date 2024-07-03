import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import Button from "@mui/material/Button";
import axiosInstance from "../axios/axiosInstance";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import MyDatePicker from "../components/MyDatePicker";
import dayjs from "dayjs";
import MySelect from "../components/MySelect";

export default function ReleaseSalaryForm() {
  const salarySchema = Yup.object({
    payStartDate: Yup.date().required("Payment from date"),
    payEndDate: Yup.date().required("Payment to date"),
    payStatus: Yup.string().required("Payment status is required"),
    totalAmountPaid: Yup.number().required("Total payable amount required"),
  });

  const formik = useFormik({
    initialValues: {
      payStartDate: dayjs(),
      payEndDate: dayjs(),
      payStatus: "",
      totalAmountPaid: "",
    },
    validationSchema: salarySchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/v1/payroll", values);

        // successful login
        if (response.status === 200) {
          // handle successful salary
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
          <MySelect
            labelName={"Employee"}
            inputId="payStatus"
            options={["Paid"]}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.payStatus}
            errors={formik.errors}
            isTouched={formik.touched.payStatus}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <MyDatePicker
            labelName="Payment from date"
            inputId={"payStartDate"}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            errors={formik.errors}
            isTouched={formik.touched.payStartDate}
            value={formik.values.payStartDate}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <MyDatePicker
            labelName="Payment to date"
            inputId={"payEndDate"}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            errors={formik.errors}
            isTouched={formik.touched.payEndDate}
            value={formik.values.payEndDate}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <MySelect
            labelName={"Payment status"}
            inputId="payStatus"
            options={["Pending", "Processed", "Paid"]}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.payStatus}
            errors={formik.errors}
            isTouched={formik.touched.payStatus}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            labelName="Total payable amount"
            inputType="number"
            inputId="totalAmountPaid"
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.totalAmountPaid}
            errors={formik.errors.totalAmountPaid}
            isTouched={formik.touched.totalAmountPaid}
          />
        </Box>
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          Release Salary
        </Button>
      </Box>
    </Paper>
  );
}

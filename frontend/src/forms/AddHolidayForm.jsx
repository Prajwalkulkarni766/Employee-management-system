import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import axiosInstance from "../axios/axiosInstance";
import MyDatePicker from "../components/MyDatePicker";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function AddHolidayForm({ statusOfIsEditing }) {
  const holiday = useSelector((state) => state.holiday.holiday);

  const holidaySchema = Yup.object({
    name: Yup.string().required("Holiday name is required"),
    date: Yup.date().required("Holiday date is required"),
    details: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: statusOfIsEditing ? holiday.name : "",
      date: statusOfIsEditing ? dayjs(holiday.date) : null,
      details: statusOfIsEditing ? holiday.details : "",
    },
    validationSchema: holidaySchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axiosInstance.post("/api/v1/holiday", values);
        if (response.status === 201 || response.status === 200) {
          Toast.success("Holiday created successfully");
          formik.resetForm();
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

  const inputFields = [
    {
      id: 1,
      labelName: "Holiday Name",
      inputType: "text",
      inputId: "name",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.name || formik.errors.name) {
          // Toast.error(formik.errors.name);
        }
      },
      value: formik.values.name,
      errors: formik.errors.name,
      isTouched: formik.touched.name,
    },
    {
      id: 2,
      labelName: "Holiday Details",
      inputType: "text",
      inputId: "details",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.details || formik.errors.details) {
          // Toast.error(formik.errors.details);
        }
      },
      value: formik.values.details,
      errors: formik.errors.details,
      isTouched: formik.touched.details,
    },
  ];

  const dateFields = [
    {
      id: 1,
      labelName: "Holiday Date",
      inputType: "date",
      inputId: "date",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.date || formik.errors.date) {
          Toast.error(formik.errors.date);
        }
      },
      value: formik.values.date,
      errors: formik.errors.date,
      isTouched: formik.touched.date,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        {inputFields.map((obj) => (
          <Input
            key={obj.id}
            labelName={obj.labelName}
            inputType={obj.inputType}
            inputId={obj.inputId}
            onChange={obj.onChange}
            onBlur={obj.onBlur}
            value={obj.value}
            errors={obj.errors}
            isTouched={obj.isTouched}
          />
        ))}
        {dateFields.map((obj) => (
          <MyDatePicker
            key={obj.id}
            labelName={obj.labelName}
            inputType={obj.inputType}
            inputId={obj.inputId}
            onChange={obj.onChange}
            onBlur={obj.onBlur}
            value={obj.value}
            errors={obj.errors}
            isTouched={obj.isTouched}
          />
        ))}
        &nbsp;
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          Create Holiday
        </Button>
      </form>
    </Paper>
  );
}

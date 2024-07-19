import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import Button from "@mui/material/Button";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../axios/axiosInstance";
import MyTimePicker from "../components/MyTimePicker";
import dayjs from "dayjs";

export default function ConfigurationForm() {
  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const configurationSchema = Yup.object({
    officeStartTime: Yup.string().required("Office Start Time Required"),
    officeEndTime: Yup.string().required("Office End Time Required"),
    lateMarkDeduction: Yup.number().required(
      "Late Mark Deduction Amount Required"
    ),
    lessWorkTimeDeduction: Yup.number().required(
      "Less Work Time Deduction Amount Required"
    ),
    halfDayDeduction: Yup.number().required(
      "Half Day Deduction Amount Required"
    ),
    totalWorkingHours: Yup.number().required("Total Working Hours Required"),
    overTimeAddition: Yup.number().required("Over Time Amount Required"),
  });

  const formik = useFormik({
    initialValues: {
      officeStartTime: dayjs(),
      officeEndTime: dayjs(),
      lateMarkDeduction: "",
      lessWorkTimeDeduction: "",
      halfDayDeduction: "",
      totalWorkingHours: "",
      overTimeAddition: "",
    },
    validationSchema: configurationSchema,
    onSubmit: async (values) => {
      try {
        // const formData = new FormData();
        // formData.append("officeStartTime", values.officeStartTime);
        // formData.append("officeEndTime", values.officeEndTime);
        // formData.append("lateMarkDeduction", values.lateMarkDeduction);
        // formData.append("lessWorkTimeDeduction", values.lessWorkTimeDeduction);
        // formData.append("halfDayDeduction", values.halfDayDeduction);
        // formData.append("totalWorkingHours", values.totalWorkingHours);
        // formData.append("overTimeAddition", values.overTimeAddition);

        // if (file) {
        //   formData.append("image", file);
        // }

        console.log(values);

        // const response = statusOfIsEditing
        //   ? await axiosInstance.patch("/v1/employee", formData)
        //   : await axiosInstance.post("/v1/employee", formData);

        // if (response.status === 201) {
        //   Toast.success("Employee created successfully");
        //   formik.resetForm();
        // } else if (response.status === 200) {
        //   Toast.success("Employee updated successfully");
        // } else {
        //   throw new Error("Unexpected status code received");
        // }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
  });

  const timeFields = [
    {
      id: 1,
      labelName: "Office Start Time",
      inputType: "text",
      inputId: "officeStartTime",
      value: formik.values.officeStartTime,
      errors: formik.errors.officeStartTime,
      isTouched: formik.touched.officeStartTime,
    },
    {
      id: 2,
      labelName: "Office End Time",
      inputType: "text",
      inputId: "officeEndTime",
      value: formik.values.officeEndTime,
      errors: formik.errors.officeEndTime,
      isTouched: formik.touched.officeEndTime,
    },
  ];

  const inputFields = [
    {
      id: 1,
      labelName: "Late Mark Deduction",
      inputType: "number",
      inputId: "lateMarkDeduction",
      value: formik.values.lateMarkDeduction,
      errors: formik.errors.lateMarkDeduction,
      isTouched: formik.touched.lateMarkDeduction,
    },
    {
      id: 2,
      labelName: "Less Work Time Deduction",
      inputType: "number",
      inputId: "lessWorkTimeDeduction",
      value: formik.values.lessWorkTimeDeduction,
      errors: formik.errors.lessWorkTimeDeduction,
      isTouched: formik.touched.lessWorkTimeDeduction,
    },
    {
      id: 3,
      labelName: "Half Day Deduction",
      inputType: "number",
      inputId: "halfDayDeduction",
      value: formik.values.halfDayDeduction,
      errors: formik.errors.halfDayDeduction,
      isTouched: formik.touched.halfDayDeduction,
    },
    {
      id: 4,
      labelName: "Total Working Hours",
      inputType: "number",
      inputId: "totalWorkingHours",
      value: formik.values.totalWorkingHours,
      errors: formik.errors.totalWorkingHours,
      isTouched: formik.touched.totalWorkingHours,
    },
    {
      id: 5,
      labelName: "Over Time Addition",
      inputType: "number",
      inputId: "overTimeAddition",
      value: formik.values.overTimeAddition,
      errors: formik.errors.overTimeAddition,
      isTouched: formik.touched.overTimeAddition,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          {timeFields.map((obj) => (
            <Grid key={obj.id} item xs={6}>
              <MyTimePicker
                labelName={obj.labelName}
                inputType={obj.inputType}
                inputId={obj.inputId}
                onChange={formik.handleChange}
                value={obj.value}
                errors={obj.errors}
                isTouched={obj.isTouched}
              />
            </Grid>
          ))}
          {inputFields.map((obj) => (
            <Grid key={obj.id} item xs={6}>
              <Input
                labelName={obj.labelName}
                inputType={obj.inputType}
                inputId={obj.inputId}
                onChange={formik.handleChange}
                value={obj.value}
                errors={obj.errors}
                isTouched={obj.isTouched}
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <MuiFileInput
              inputProps={{ accept: ".png, .jpeg" }}
              label="Company Logo"
              value={file}
              onChange={handleChange}
              hideSizeText={false}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseIcon fontSize="small" />,
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        {/* &nbsp; */}
        &nbsp;
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          Save Changes
        </Button>
      </form>
    </Paper>
  );
}

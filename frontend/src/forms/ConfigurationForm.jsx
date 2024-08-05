import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import MyTimePicker from "../components/MyTimePicker";
import dayjs from "dayjs";
import MyMultipleSelect from "../components/MyMultipleSelect";

export default function ConfigurationForm() {

  const handleMultipleSelectionChange = (value) => {
    formik.setFieldValue('holiday', value);
  }

  const configurationSchema = Yup.object({
    officeName: Yup.string().required("Office Name Required"),
    officeStartTime: Yup.string().required("Office Start Time Required"),
    officeEndTime: Yup.string().required("Office End Time Required"),
    lateMarkDeduction: Yup.number().required(
      "Late Mark Deduction Amount Required"
    ),
    lessWorkTimeDeduction: Yup.number().required(
      "Less Work Time Deduction Amount Required"
    ),
    halfDayDeduction: Yup.number().required("Half Day Deduction Required"),
    halfDayWorkingHours: Yup.number().required(
      "Half Day Working Hours"
    ),
    totalWorkingHours: Yup.number().required("Total Working Hours Required"),
    overTimeWorkingHours: Yup.number().required("Total Over Time Working Hours Required"),
    overTimeAddition: Yup.number().required("Over Time Amount Required"),
    holiday: Yup.array(),
    totalCasualLeaves: Yup.number().required("Total Casual Leave"),
    totalMedicalLeaves: Yup.number().required("Total Medical Leaves"),
    amountDeductedWhenEmployeeIsAbsent: Yup.number().required("Amount Deducted When Employee Is Absent")
  });

  const formik = useFormik({
    initialValues: {
      officeName: '',
      officeStartTime: dayjs(),
      officeEndTime: dayjs(),
      lateMarkDeduction: 0,
      lessWorkTimeDeduction: 0,
      halfDayDeduction: 0,
      halfDayWorkingHours: 0,
      totalWorkingHours: 0,
      overTimeWorkingHours: 0,
      overTimeAddition: 0,
      holiday: [],
      totalCasualLeaves: 0,
      totalMedicalLeaves: 0,
      amountDeductedWhenEmployeeIsAbsent: 0,
    },
    validationSchema: configurationSchema,
    onSubmit: async (values) => {
      try {

        if (values.holiday.length == 0) {
          formik.setFieldError("holiday", "Holiday required")
          return;
        }

        const response = await axiosInstance.post("/v1/configuration", {
          officeName: values.officeName,
          officeStartTime: dayjs(values.officeStartTime).format("HH:mm A"),
          officeEndTime: dayjs(values.officeEndTime).format("HH:mm A"),
          lateMarkDeduction: values.lateMarkDeduction,
          lessWorkTimeDeduction: values.lessWorkTimeDeduction,
          halfDayDeduction: values.halfDayDeduction,
          halfDayWorkingHours: values.halfDayWorkingHours,
          totalWorkingHours: values.totalWorkingHours,
          overTimeWorkingHours: values.overTimeWorkingHours,
          overTimeAddition: values.overTimeAddition,
          holiday: values.holiday,
          totalCasualLeaves: values.totalCasualLeaves,
          totalMedicalLeaves: values.totalMedicalLeaves,
          amountDeductedWhenEmployeeIsAbsent: values.amountDeductedWhenEmployeeIsAbsent
        });

        if (response.status === 200) {
          Toast.success("Configured successfully");
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

  const timeFields = [
    {
      id: 1,
      labelName: "Office Start Time",
      inputId: "officeStartTime",
      errors: formik.errors.officeStartTime,
      isTouched: formik.touched.officeStartTime,
      onChange: (newValue) => formik.setFieldValue("officeStartTime", newValue),
      defaultValue: formik.values.officeStartTime,
    },
    {
      id: 2,
      labelName: "Office End Time",
      inputId: "officeEndTime",
      errors: formik.errors.officeEndTime,
      isTouched: formik.touched.officeEndTime,
      onChange: (newValue) => formik.setFieldValue("officeEndTime", newValue),
      defaultValue: formik.values.officeEndTime,
    },
  ];

  const inputFields = [
    {
      id: 1,
      labelName: "Office Name",
      inputType: "text",
      inputId: "officeName",
      value: formik.values.officeName,
      errors: formik.errors.officeName,
      isTouched: formik.touched.officeName,
    },
    {
      id: 2,
      labelName: "Late Mark Deduction",
      inputType: "number",
      inputId: "lateMarkDeduction",
      value: formik.values.lateMarkDeduction,
      errors: formik.errors.lateMarkDeduction,
      isTouched: formik.touched.lateMarkDeduction,
    },
    {
      id: 3,
      labelName: "Less Work Time Deduction",
      inputType: "number",
      inputId: "lessWorkTimeDeduction",
      value: formik.values.lessWorkTimeDeduction,
      errors: formik.errors.lessWorkTimeDeduction,
      isTouched: formik.touched.lessWorkTimeDeduction,
    },
    {
      id: 4,
      labelName: "Half Working Hours",
      inputType: "number",
      inputId: "halfDayWorkingHours",
      value: formik.values.halfDayWorkingHours,
      errors: formik.errors.halfDayWorkingHours,
      isTouched: formik.touched.halfDayWorkingHours,
    },
    {
      id: 5,
      labelName: "Total Working Hours",
      inputType: "number",
      inputId: "totalWorkingHours",
      value: formik.values.totalWorkingHours,
      errors: formik.errors.totalWorkingHours,
      isTouched: formik.touched.totalWorkingHours,
    },
    {
      id: 6,
      labelName: "Over Time Addition Per Hour",
      inputType: "number",
      inputId: "overTimeAddition",
      value: formik.values.overTimeAddition,
      errors: formik.errors.overTimeAddition,
      isTouched: formik.touched.overTimeAddition,
    },
    {
      id: 7,
      labelName: "Over Time Working Hours",
      inputType: "number",
      inputId: "overTimeWorkingHours",
      value: formik.values.overTimeWorkingHours,
      errors: formik.errors.overTimeWorkingHours,
      isTouched: formik.touched.overTimeWorkingHours,
    },
    {
      id: 8,
      labelName: "Total Paid Casual Leaves",
      inputType: "number",
      inputId: "totalCasualLeaves",
      value: formik.values.totalCasualLeaves,
      errors: formik.errors.totalCasualLeaves,
      isTouched: formik.touched.totalCasualLeaves,
    },
    {
      id: 9,
      labelName: "Total Paid Medical Leaves",
      inputType: "number",
      inputId: "totalMedicalLeaves",
      value: formik.values.totalMedicalLeaves,
      errors: formik.errors.totalMedicalLeaves,
      isTouched: formik.touched.totalMedicalLeaves,
    },
    {
      id: 10,
      labelName: "Amount Deducted When Employee Is Absent",
      inputType: "number",
      inputId: "amountDeductedWhenEmployeeIsAbsent",
      value: formik.values.amountDeductedWhenEmployeeIsAbsent,
      errors: formik.errors.amountDeductedWhenEmployeeIsAbsent,
      isTouched: formik.touched.amountDeductedWhenEmployeeIsAbsent,
    },
    {
      id: 11,
      labelName: "Half Day Deduction",
      inputType: "number",
      inputId: "halfDayDeduction",
      value: formik.values.halfDayDeduction,
      errors: formik.errors.halfDayDeduction,
      isTouched: formik.touched.halfDayDeduction,
    }
  ];

  useEffect(() => {

    (async function () {
      try {
        const response = await axiosInstance.get("/v1/configuration");

        // setting value to form 
        formik.setFieldValue("officeName", response.data.data.officeName)
        formik.setFieldValue("officeStartTime", response.data.data.officeStartTime)
        formik.setFieldValue("officeEndTime", response.data.data.officeEndTime)
        formik.setFieldValue("lateMarkDeduction", response.data.data.lateMarkDeduction)
        formik.setFieldValue("lessWorkTimeDeduction", response.data.data.lessWorkTimeDeduction)
        formik.setFieldValue("halfDayDeduction", response.data.data.halfDayDeduction)
        formik.setFieldValue("halfDayWorkingHours", response.data.data.halfDayWorkingHours)
        formik.setFieldValue("totalWorkingHours", response.data.data.totalWorkingHours)
        formik.setFieldValue("overTimeWorkingHours", response.data.data.overTimeWorkingHours)
        formik.setFieldValue("overTimeAddition", response.data.data.overTimeAddition)
        formik.setFieldValue("holiday", response.data.data.holiday)
        formik.setFieldValue("totalCasualLeaves", response.data.data.totalCasualLeaves)
        formik.setFieldValue("totalMedicalLeaves", response.data.data.totalMedicalLeaves)
        formik.setFieldValue("amountDeductedWhenEmployeeIsAbsent", response.data.data.amountDeductedWhenEmployeeIsAbsent)
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    })();
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          {timeFields.map((obj) => (
            <Grid key={obj.id} item xs={6}>
              <MyTimePicker
                labelName={obj.labelName}
                inputId={obj.inputId}
                onChange={obj.onChange}
                defaultValue={obj.defaultValue}
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
            <MyMultipleSelect
              options={[
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ]}
              labelName={"Holiday List"}
              onChange={handleMultipleSelectionChange}
              value={formik.values.holiday}
              errors={formik.errors.holiday}
              isTouched={formik.touched.holiday}
            />
          </Grid>
        </Grid>
        &nbsp;
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          fullWidth
        >
          Save Changes
        </Button>
      </form>
    </Paper>
  );
}

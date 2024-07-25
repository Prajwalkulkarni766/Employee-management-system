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
import { useSelector, useDispatch } from "react-redux";
import { setConfiguration } from "../redux/configuration/index.slice";

export default function ConfigurationForm() {

  const dispatch = useDispatch();
  const configuration = useSelector((state) => state.configuration.configuration);

  const handleMultipleSelectionChange = (value) => {
    formik.setFieldValue('holiday', value);
  }

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
    holiday: Yup.array()
  });

  const formik = useFormik({
    initialValues: {
      officeStartTime: configuration.officeStartTime ? dayjs() : dayjs(),
      officeEndTime: configuration.officeEndTime ? dayjs() : dayjs(),
      lateMarkDeduction: configuration.lateMarkDeduction ? configuration.lateMarkDeduction : 0,
      lessWorkTimeDeduction: configuration.lessWorkTimeDeduction ? configuration.lessWorkTimeDeduction : 0,
      halfDayDeduction: configuration.halfDayDeduction ? configuration.halfDayDeduction : 0,
      totalWorkingHours: configuration.totalWorkingHours ? configuration.totalWorkingHours : 0,
      overTimeAddition: configuration.overTimeAddition ? configuration.overTimeAddition : 0,
      holiday: configuration.holiday ? configuration.holiday : []
    },
    validationSchema: configurationSchema,
    onSubmit: async (values) => {
      try {

        if (values.holiday.length == 0) {
          formik.setFieldError("holiday", "Holiday required")
          return;
        }

        const response = await axiosInstance.post("/v1/configuration", {
          officeStartTime: dayjs(values.officeStartTime).format("HH:mm"),
          officeEndTime: dayjs(values.officeEndTime).format("HH:mm"),
          lateMarkDeduction: values.lateMarkDeduction,
          lessWorkTimeDeduction: values.lessWorkTimeDeduction,
          halfDayDeduction: values.halfDayDeduction,
          totalWorkingHours: values.totalWorkingHours,
          overTimeAddition: values.overTimeAddition,
          holiday: values.holiday
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

  useEffect(() => {

    // if configuration not found then fetch from
    if (!configuration.officeStartTime) {

      (async function () {
        try {
          const response = await axiosInstance.get("/v1/configuration");
          // setting value to form 
          formik.setFieldValue("lateMarkDeduction", response.data.data.lateMarkDeduction)
          formik.setFieldValue("lessWorkTimeDeduction", response.data.data.lessWorkTimeDeduction)
          formik.setFieldValue("halfDayDeduction", response.data.data.halfDayDeduction)
          formik.setFieldValue("totalWorkingHours", response.data.data.totalWorkingHours)
          formik.setFieldValue("overTimeAddition", response.data.data.overTimeAddition)
          formik.setFieldValue("holiday", response.data.data.holiday)
          dispatch(setConfiguration(response.data.data))
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "An error occurred.";
        }
      })();
    }
  }, [])

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

import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import MyButton from "../components/MyButton";

export default function AddHolidayForm() {
  const holidaySchema = new Yup.object({
    holidayName: Yup.string().required("Holiday name is required"),
    holidayDate: Yup.date().required("Holiday date is required"),
    holidayDetails: Yup.string().required("Holiday details are required"),
  });

  const formik = useFormik({
    initialValues: {
      holidayName: "",
      holidayDate: new Date(),
      holidayDetails: "",
    },
    validationSchema: holidaySchema,
    onSubmit: async (values) => {
      // const { email, password } = values;
    },
  });

  const inputFields = [
    {
      id: 1,
      labelName: "Holiday Name",
      inputType: "text",
      inputId: "holidayName",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.holidayName || formik.errors.holidayName) {
          Toast.error(formik.errors.holidayName);
        }
      },
      value: formik.values.holidayName,
      errors: formik.errors.holidayName,
      isTouched: formik.touched.holidayName,
    },
    {
      id: 2,
      labelName: "Holiday Date",
      inputType: "date",
      inputId: "holidayDate",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.holidayDate || formik.errors.holidayDate) {
          Toast.error(formik.errors.holidayDate);
        }
      },
      value: formik.values.holidayDate,
      errors: formik.errors.holidayDate,
      isTouched: formik.touched.holidayDate,
    },
    {
      id: 3,
      labelName: "Holiday Details",
      inputType: "text",
      inputId: "holidayDetails",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.holidayDetails || formik.errors.holidayDetails) {
          Toast.error(formik.errors.holidayDetails);
        }
      },
      value: formik.values.holidayDetails,
      errors: formik.errors.holidayDetails,
      isTouched: formik.touched.holidayDetails,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
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
      <MyButton type="submit" labelName="Create Holiday" />
    </Paper>
  );
}

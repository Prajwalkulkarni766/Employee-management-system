import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import MySelect from "../components/MySelect";
import Button from "@mui/material/Button";
import MyDatePicker from "../components/MyDatePicker";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import axiosInstance from "../axios/axiosInstance";
import { useSelector, useDispatch } from "react-redux";

export default function EmployeeForm({ statusOfIsEditing }) {
  const [file, setFile] = useState(null);

  const employee = useSelector((state) => state.employee.employee);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const employeeSchema = Yup.object({
    firstName: Yup.string().required("Employee First Name Required"),
    lastName: Yup.string().required("Employee Last Name Required"),
    gender: Yup.string().required("Gender Required"),
    mobileNumber: Yup.string().required("Mobile Number Required"),
    password: Yup.string()
      .min(8, "Too Short Password!")
      .max(16, "Too Long Password!")
      .required("Password Required"),
    designation: Yup.string().required("Designation Required"),
    department: Yup.string().required("Department Required"),
    address: Yup.string().required("Address Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address Required"),
    dateOfBirth: Yup.date().required("Date of Birth Required"),
    education: Yup.string().required("Education Required"),
    joiningDate: Yup.date().required("Joining Date Required"),
    salary: Yup.number().required("Salary Required"),
    role: Yup.string().required("Role Required"),
    isworking: Yup.string().required("Is working Required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeId: statusOfIsEditing ? employee.employeeId : "",
      firstName: statusOfIsEditing ? employee.firstName : "",
      lastName: statusOfIsEditing ? employee.lastName : "",
      gender: statusOfIsEditing ? employee.gender : "",
      mobileNumber: statusOfIsEditing ? employee.mobileNumber : "",
      password: statusOfIsEditing ? "********" : "",
      designation: statusOfIsEditing ? employee.designation : "",
      department: statusOfIsEditing ? employee.department : "",
      address: statusOfIsEditing ? employee.address : "",
      email: statusOfIsEditing ? employee.email : "",
      dateOfBirth: statusOfIsEditing ? dayjs(employee.dateOfBirth) : dayjs(),
      education: statusOfIsEditing ? employee.education : "",
      joiningDate: statusOfIsEditing ? dayjs(employee.joiningDate) : dayjs(),
      salary: statusOfIsEditing ? employee.salary : "",
      role: statusOfIsEditing ? employee.role : "",
      isworking: statusOfIsEditing ? (employee.isWorking ? "Yes" : "No") : "",
    },
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("employeeId", values.employeeId);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("gender", values.gender);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("password", values.password);
        formData.append("designation", values.designation);
        formData.append("department", values.department);
        formData.append("address", values.address);
        formData.append("email", values.email);
        formData.append(
          "dateOfBirth",
          dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        );
        formData.append("education", values.education);
        formData.append(
          "joiningDate",
          dayjs(values.joiningDate).format("YYYY-MM-DD")
        );
        formData.append("salary", values.salary);
        formData.append("role", values.role);
        formData.append("isWorking", values.isworking === "Yes" ? true : false);

        if (file) {
          formData.append("image", file);
        }

        const response = statusOfIsEditing
          ? await axiosInstance.patch("/v1/employee", formData)
          : await axiosInstance.post("/v1/employee", formData);

        if (response.status === 201) {
          Toast.success("Employee created successfully");
          formik.resetForm();
        } else if (response.status === 200) {
          Toast.success("Employee updated successfully");
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
      labelName: "First Name",
      inputType: "text",
      inputId: "firstName",
      value: formik.values.firstName,
      errors: formik.errors.firstName,
      isTouched: formik.touched.firstName,
    },
    {
      id: 2,
      labelName: "Last Name",
      inputType: "text",
      inputId: "lastName",
      value: formik.values.lastName,
      errors: formik.errors.lastName,
      isTouched: formik.touched.lastName,
    },
    {
      id: 3,
      labelName: "Mobile Number",
      inputType: "number",
      inputId: "mobileNumber",
      value: formik.values.mobileNumber,
      errors: formik.errors.mobileNumber,
      isTouched: formik.touched.mobileNumber,
    },
    {
      id: 4,
      labelName: "Password",
      inputType: "password",
      inputId: "password",
      value: formik.values.password,
      errors: formik.errors.password,
      isTouched: formik.touched.password,
    },
    {
      id: 5,
      labelName: "Designation",
      inputType: "text",
      inputId: "designation",
      value: formik.values.designation,
      errors: formik.errors.designation,
      isTouched: formik.touched.designation,
    },
    {
      id: 6,
      labelName: "Address",
      inputType: "text",
      inputId: "address",
      value: formik.values.address,
      errors: formik.errors.address,
      isTouched: formik.touched.address,
    },
    {
      id: 7,
      labelName: "Email",
      inputType: "email",
      inputId: "email",
      value: formik.values.email,
      errors: formik.errors.email,
      isTouched: formik.touched.email,
    },
    {
      id: 8,
      labelName: "Education",
      inputType: "text",
      inputId: "education",
      value: formik.values.education,
      errors: formik.errors.education,
      isTouched: formik.touched.education,
    },
    {
      id: 9,
      labelName: "Salary",
      inputType: "number",
      inputId: "salary",
      value: formik.values.salary,
      errors: formik.errors.salary,
      isTouched: formik.touched.salary,
    },
  ];

  const dateFields = [
    {
      id: 1,
      labelName: "Date of Birth",
      inputType: "date",
      inputId: "dateOfBirth",
      value: formik.values.dateOfBirth,
      errors: formik.errors.dateOfBirth,
      isTouched: formik.touched.dateOfBirth,
    },
    {
      id: 2,
      labelName: "Joining Date",
      inputType: "date",
      inputId: "joiningDate",
      value: formik.values.joiningDate,
      errors: formik.errors.joiningDate,
      isTouched: formik.touched.joiningDate,
    },
  ];

  const selectFields = [
    {
      id: 1,
      labelName: "Gender",
      inputType: "select",
      inputId: "gender",
      value: formik.values.gender,
      errors: formik.errors.gender,
      isTouched: formik.touched.gender,
      options: ["Male", "Female", "Other"],
    },
    {
      id: 2,
      labelName: "Department",
      inputType: "select",
      inputId: "department",
      value: formik.values.department,
      errors: formik.errors.department,
      isTouched: formik.touched.department,
      options: ["Development", "Designing", "Testing", "HR"],
    },
    {
      id: 3,
      labelName: "Role",
      inputType: "select",
      inputId: "role",
      value: formik.values.role,
      errors: formik.errors.role,
      isTouched: formik.touched.role,
      options: ["Employee", "Admin"],
    },
    {
      id: 4,
      labelName: "Isworking",
      inputType: "select",
      inputId: "isworking",
      value: formik.values.isworking,
      errors: formik.errors.isworking,
      isTouched: formik.touched.isworking,
      options: ["Yes", "No"],
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
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
          {dateFields.map((obj) => (
            <Grid key={obj.id} item xs={6}>
              <MyDatePicker
                labelName={obj.labelName}
                inputId={obj.inputId}
                onChange={formik.handleChange}
                errors={obj.errors}
                isTouched={obj.isTouched}
                value={obj.value}
              />
            </Grid>
          ))}
          {selectFields.map((obj) => (
            <Grid key={obj.id} item xs={6}>
              <MySelect
                labelName={obj.labelName}
                inputId={obj.inputId}
                options={obj.options}
                onChange={formik.handleChange}
                value={obj.value}
                errors={obj.errors}
                isTouched={obj.isTouched}
              />
            </Grid>
          ))}
        </Grid>
        &nbsp;
        <MuiFileInput
          inputProps={{ accept: ".png, .jpeg" }}
          label="Profile image"
          value={file}
          onChange={handleChange}
          hideSizeText={false}
          clearIconButtonProps={{
            title: "Remove",
            children: <CloseIcon fontSize="small" />,
          }}
          fullWidth
        />
        &nbsp;
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          {statusOfIsEditing ? `Edit Employee` : `Create Employee`}
        </Button>
      </form>
    </Paper>
  );
}

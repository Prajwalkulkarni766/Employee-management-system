import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import MySelect from "../components/MySelect";

export default function EmployeeForm() {
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
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      mobileNumber: "",
      password: "",
      designation: "",
      department: "",
      address: "",
      email: "",
      dateOfBirth: new Date().toISOString(),
      education: "",
      joiningDate: new Date().toISOString(),
      salary: "",
      role: "",
      profileImage: undefined,
    },
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
    },
  });

  const inputFields = [
    {
      id: 1,
      labelName: "First Name",
      inputType: "text",
      inputId: "firstName",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.firstName || formik.errors.firstName) {
          Toast.error(formik.errors.firstName);
        }
      },
      value: formik.values.firstName,
      errors: formik.errors.firstName,
      isTouched: formik.touched.firstName,
    },
    {
      id: 2,
      labelName: "Last Name",
      inputType: "text",
      inputId: "lastName",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.lastName || formik.errors.lastName) {
          Toast.error(formik.errors.lastName);
        }
      },
      value: formik.values.lastName,
      errors: formik.errors.lastName,
      isTouched: formik.touched.lastName,
    },
    {
      id: 3,
      labelName: "Mobile Number",
      inputType: "number",
      inputId: "mobileNumber",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.mobileNumber || formik.errors.mobileNumber) {
          Toast.error(formik.errors.mobileNumber);
        }
      },
      value: formik.values.mobileNumber,
      errors: formik.errors.mobileNumber,
      isTouched: formik.touched.mobileNumber,
    },
    {
      id: 4,
      labelName: "Password",
      inputType: "password",
      inputId: "password",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.password || formik.errors.password) {
          Toast.error(formik.errors.password);
        }
      },
      value: formik.values.password,
      errors: formik.errors.password,
      isTouched: formik.touched.password,
    },
    {
      id: 5,
      labelName: "Designation",
      inputType: "text",
      inputId: "designation",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.designation || formik.errors.designation) {
          Toast.error(formik.errors.designation);
        }
      },
      value: formik.values.designation,
      errors: formik.errors.designation,
      isTouched: formik.touched.designation,
    },
    {
      id: 6,
      labelName: "Address",
      inputType: "text",
      inputId: "address",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.address || formik.errors.address) {
          Toast.error(formik.errors.address);
        }
      },
      value: formik.values.address,
      errors: formik.errors.address,
      isTouched: formik.touched.address,
    },
    {
      id: 7,
      labelName: "Email",
      inputType: "email",
      inputId: "email",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.email || formik.errors.email) {
          Toast.error(formik.errors.email);
        }
      },
      value: formik.values.email,
      errors: formik.errors.email,
      isTouched: formik.touched.email,
    },
    {
      id: 8,
      labelName: "Date of Birth",
      inputType: "date",
      inputId: "dateOfBirth",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.dateOfBirth || formik.errors.dateOfBirth) {
          Toast.error(formik.errors.dateOfBirth);
        }
      },
      value: formik.values.dateOfBirth,
      errors: formik.errors.dateOfBirth,
      isTouched: formik.touched.dateOfBirth,
    },
    {
      id: 9,
      labelName: "Education",
      inputType: "text",
      inputId: "education",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.education || formik.errors.education) {
          Toast.error(formik.errors.education);
        }
      },
      value: formik.values.education,
      errors: formik.errors.education,
      isTouched: formik.touched.education,
    },
    {
      id: 10,
      labelName: "Joining Date",
      inputType: "date",
      inputId: "joiningDate",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.joiningDate || formik.errors.joiningDate) {
          Toast.error(formik.errors.joiningDate);
        }
      },
      value: formik.values.joiningDate,
      errors: formik.errors.joiningDate,
      isTouched: formik.touched.joiningDate,
    },
    {
      id: 11,
      labelName: "Salary",
      inputType: "number",
      inputId: "salary",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.salary || formik.errors.salary) {
          Toast.error(formik.errors.salary);
        }
      },
      value: formik.values.salary,
      errors: formik.errors.salary,
      isTouched: formik.touched.salary,
    },
    {
      id: 12,
      labelName: "Profile Image",
      inputType: "file",
      inputId: "profileImage",
      onChange: (event) => {
        formik.setFieldValue("profileImage", event.currentTarget.files[0]);
      },
      onBlur: () => {
        if (formik.touched.profileImage || formik.errors.profileImage) {
          Toast.error(formik.errors.profileImage);
        }
      },
      value: undefined,
      errors: formik.errors.profileImage,
      isTouched: formik.touched.profileImage,
    },
  ];

  const selectFields = [
    {
      id: 1,
      labelName: "Gender",
      inputType: "text",
      inputId: "gender",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.gender || formik.errors.gender) {
          Toast.error(formik.errors.gender);
        }
      },
      value: formik.values.gender,
      errors: formik.errors.gender,
      isTouched: formik.touched.gender,
      options: ["Male", "Female", "Other"],
    },
    {
      id: 2,
      labelName: "Department",
      inputType: "text",
      inputId: "department",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.department || formik.errors.department) {
          Toast.error(formik.errors.department);
        }
      },
      value: formik.values.department,
      errors: formik.errors.department,
      isTouched: formik.touched.department,
      options: ["Development", "Designing", "Testing", "HR"],
    },
    {
      id: 3,
      labelName: "Role",
      inputType: "text",
      inputId: "role",
      onChange: formik.handleChange,
      onBlur: () => {
        if (formik.touched.role || formik.errors.role) {
          Toast.error(formik.errors.role);
        }
      },
      value: formik.values.role,
      errors: formik.errors.role,
      isTouched: formik.touched.role,
      options: ["Employee", "Admin"],
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container component="main" spacing={2}>
        {inputFields.map((obj) => (
          <Grid key={obj.id} item xs={6}>
            <Input
              labelName={obj.labelName}
              inputType={obj.inputType}
              inputId={obj.inputId}
              onChange={obj.onChange}
              onBlur={obj.onBlur}
              value={obj.value}
              errors={obj.errors}
              isTouched={obj.isTouched}
            />
          </Grid>
        ))}

        {selectFields.map((obj) => (
          <Grid key={obj.id} item xs={6}>
            <MySelect labelName={obj.labelName} options={obj.options} />
          </Grid>
        ))}
      </Grid>
      &nbsp;
      <MyButton type="submit" labelName="Create Employee" />
    </Paper>
  );
}

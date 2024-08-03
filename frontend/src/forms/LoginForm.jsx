import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import Button from "@mui/material/Button";
import axiosInstance from "../axios/axiosInstance";
import { Grid, Box, FormControlLabel, Checkbox } from "@mui/material";
import kuber from "../assets/kuber.png";
import React from "react";
import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/auth/index.slice";
import { setEmployee } from "../redux/employee/index.slice";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const changeCheckboxState = () => {
    setIsChecked(!isChecked);
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address Required"),
    password: Yup.string()
      .min(8, "Too Short Password!")
      .max(16, "Too Long Password!")
      .required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/v1/auth/login", values);

        // Successful login
        if (response.status === 200) {
          Toast.success("Login successfully");
          const token = response.data.data.token;
          dispatch(setToken(token));
          dispatch(setEmployee(response.data.data));
          localStorage.setItem("employeeName", response.data.data.employee.firstName);
          localStorage.setItem("employeeRole", response.data.data.employee.role);

          // If checkbox is checked
          if (isChecked) {
            localStorage.setItem("authToken", token);
          }

          // Navigate based on user role
          if (response.data.data.employee.role === "Admin") {
            navigate("/admin/dashboard");
          } else if (response.data.data.employee.role === "Employee") {
            navigate("/employee/dashboard");
          } else {
            throw new Error("Unexpected user role received");
          }
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: `url(${kuber})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
        md={6}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={12}
        sx={6}
        md={6}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <PageHeading pageName="Login" />
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, width: "100%" }}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              labelName="Email address"
              inputType="email"
              inputId="email"
              onChange={formik.handleChange}
              onBlur={() => {
                if (formik.touched.email || formik.errors.email) {
                  Toast.error(formik.errors.email);
                }
              }}
              value={formik.values.email}
              errors={formik.errors.email}
              isTouched={formik.touched.email}
            />
            <Input
              labelName="Password"
              inputType="password"
              inputId="password"
              onChange={formik.handleChange}
              onBlur={() => {
                if (formik.touched.password || formik.errors.password) {
                  Toast.error(formik.errors.password);
                }
              }}
              value={formik.values.password}
              errors={formik.errors.password}
              isTouched={formik.touched.password}
            />
            <Grid
              container
              spacing={2}
              sx={{ alignItems: "center", mt: 2 }}
            >
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={changeCheckboxState}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: "13px 15px" }}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import axios from "axios";
import { Grid, Box, FormControlLabel, Checkbox, Link } from "@mui/material";
import kuber from "../assets/kuber.png";
import React from "react";
import PageHeading from "../components/PageHeading";

export default function LoginForm() {
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
      const { email, password } = values;
      //   try {
      //     const response = await axios.post("/api/v1/login", {
      //       userName: email,
      //       password,
      //     });
      //     const token = response.data.token;
      //     dispatch(setToken(token));
      //     Cookies.set("authToken", token);
      //     navigate("/dashboard");
      //   } catch (error) {
      //     Toast.error(error.response?.data?.message || "Something went wrong");
      //   }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
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
        }}
      ></Grid>
      <Grid item xs={12} sm={6} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 15,
            marginLeft: "15%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <PageHeading pageName="Login" />
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={formik.handleSubmit}
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
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={6}>
                {/* <Link
                  href="#"
                  variant="body2"
                  sx={{ float: "right", marginTop: "-6%" }}
                >
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item xs={12}>
                <MyButton labelName={"Login"} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Toast from "../../helper/Toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupSchema = Yup.object({
    name: Yup.string().min(3, "Name Too Short!").required("Name Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address Required"),
    mobileNumber: Yup.string().matches(
      /^[0-9]{10}$/,
      "Mobile number must be exactly 10 digits"
    ),
    password: Yup.string()
      .min(8, "Password Too Short!")
      .max(16, "Password Too Long!")
      .required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const { name, email, mobileNumber, password } = values;
      try {
        const response = await axios.post("/api/v1/login", {
          name: name,
          email: email,
          mobileNumber: mobileNumber,
          password: password,
        });
        const token = response.data.token;
        dispatch(setToken(token));
        Cookies.set("authToken", token);
        navigate("/dashboard");
      } catch (error) {
        Toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        autoComplete="off"
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Signup form
            </Typography>
            <br />
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name={"name"}
                type={"text"}
                id={"name"}
                label={"Name"}
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={() => {
                  if (formik.touched.name || formik.errors.name) {
                    Toast.error(formik.errors.name);
                  }
                }}
                required
                fullWidth
              />
              <p></p>

              <TextField
                name={"email"}
                type={"email"}
                id={"email"}
                label={"Email address"}
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={() => {
                  if (formik.touched.email || formik.errors.email) {
                    Toast.error(formik.errors.email);
                  }
                }}
                required
                fullWidth
              />
              <p></p>

              <TextField
                name={"mobileNumber"}
                type={"number"}
                id={"mobileNumber"}
                label={"Mobile number"}
                variant="outlined"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={() => {
                  if (
                    formik.touched.mobileNumber ||
                    formik.errors.mobileNumber
                  ) {
                    Toast.error(formik.errors.mobileNumber);
                  }
                }}
                required
                fullWidth
              />
              <p></p>

              <TextField
                name={"password"}
                type={"password"}
                id={"password"}
                label={"Password"}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={() => {
                  if (formik.touched.password || formik.errors.password) {
                    Toast.error(formik.errors.password);
                  }
                }}
                required
                fullWidth
              />
              <p></p>

              <Button type="submit" size="large" variant="contained" fullWidth>
                Signup
              </Button>
            </form>
            <br />
            <NavLink to="/">Have an account? login</NavLink>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

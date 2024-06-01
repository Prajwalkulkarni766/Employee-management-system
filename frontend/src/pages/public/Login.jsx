import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Toast from "../../helper/Toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookieToken = Cookies.get("authToken");
  const token = useSelector((state) => state.token.token);

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
      try {
        console.log("request send");
        const response = await axios.post("/api/v1/login", {
          userName: email,
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

  if (token || cookieToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Login form
            </Typography>
            <br />
            <form onSubmit={formik.handleSubmit}>
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
                Login
              </Button>
            </form>
            <br />
            <NavLink to="/signup">Don&apos;t have an account? signup</NavLink>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

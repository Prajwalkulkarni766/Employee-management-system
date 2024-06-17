import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toast from "../../helper/Toast";
import kuber from "../../assets/kuber.png";
import Input from "../../components/Input";

const Login = () => {
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
        const response = await axios.post("/api/v1/login", {
          userName: email,
          password,
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
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginLeft: "15%", marginTop: "5%", fontWeight: "bold" }}
        >
          WELCOME
        </Typography>
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
          <Typography component="h1" variant="h4" marginBottom={2}>
            Login
          </Typography>
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
                if (formik.touched.email && formik.errors.email) {
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
                if (formik.touched.password && formik.errors.password) {
                  Toast.error(formik.errors.password);
                }
              }}
              value={formik.values.password}
              errors={formik.errors.password}
              isTouched={formik.touched.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ float: "right", marginTop: "-6%" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="text"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1,
                  borderRadius: "20px",
                  backgroundColor: "#343dff",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  },
                }}
              >
                Login
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

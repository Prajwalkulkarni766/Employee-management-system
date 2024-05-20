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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookieToken = Cookies.get("authToken");
  const token = useSelector((state) => state.token.token);

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      axios
        .post("/api/v1/login", {
          userName: email,
          password: password,
        })
        .then((response) => {
          const token = response.data.token;
          dispatch(setToken(token));
          Cookies.set("authToken", token);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                fullWidth
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="error-text">{formik.errors.email}</p>
              ) : (
                <p></p>
              )}

              <TextField
                name={"password"}
                type={"password"}
                id={"password"}
                label={"Password"}
                variant="outlined"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                fullWidth
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error-text">{formik.errors.password}</p>
              ) : (
                <p></p>
              )}

              <Button size="large" variant="contained" fullWidth>
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

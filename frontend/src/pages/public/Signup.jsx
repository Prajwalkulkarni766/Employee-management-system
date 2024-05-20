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

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupSchema = Yup.object({
    name: Yup.string().min(3, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobileNumber: Yup.string().matches(
      /^[0-9]{10}$/,
      "Must be exactly 10 digits"
    ),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const { name, email, mobileNumber, password } = values;
      axios
        .post("/api/v1/login", {
          name: name,
          email: email,
          mobileNumber: mobileNumber,
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                fullWidth
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="error-text">{formik.errors.name}</p>
              ) : (
                <p></p>
              )}

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
                name={"mobileNumber"}
                type={"number"}
                id={"mobileNumber"}
                label={"Mobile number"}
                variant="outlined"
                value={formik.values.mobileNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                fullWidth
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                <p className="error-text">{formik.errors.mobileNumber}</p>
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

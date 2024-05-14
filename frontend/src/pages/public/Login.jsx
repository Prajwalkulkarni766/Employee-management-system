import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

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
      <div className="container mt-5">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login form</h1>
          <br />
          <Input
            labelName="Email address"
            inputType="email"
            inputId="email"
            placeholder="Enter email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errors={formik.errors.email}
            isTouched={formik.touched.email}
          />

          <Input
            labelName="Password"
            inputType="password"
            inputId="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            errors={formik.errors.password}
            isTouched={formik.touched.password}
          />

          <Button labelName="Login" />
          <br />
          <br />
          <NavLink to="/signup" className="nav-nav-underline ">
            Don&apos;t have account signup
          </NavLink>
        </form>
      </div>
    </>
  );
}

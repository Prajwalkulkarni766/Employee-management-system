import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Navbar />
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
            value={formik.values.email}
          />
          <Input
            labelName="Password"
            inputType="password"
            inputId="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button labelName="Login" />
        </form>
      </div>
    </>
  );
}

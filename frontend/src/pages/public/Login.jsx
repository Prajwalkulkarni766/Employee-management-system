import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../../features/auth/auth.slice";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import Toast from "../../helper/Toast";
import LoginForm from "../../forms/LoginForm";

const Login = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cookieToken = Cookies.get("authToken");
  const token = useSelector((state) => state.token.token);

  if (token || cookieToken) {
    return <Navigate to="/dashboard" />;
  }

  return <LoginForm />;
};

export default Login;

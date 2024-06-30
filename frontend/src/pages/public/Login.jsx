import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../../forms/LoginForm";

const Login = () => {
  const tokenFromStore = useSelector((state) => state.token.token);
  const tokenFromLocalStorage = localStorage.getItem("authToken");

  // if (tokenFromStore || tokenFromLocalStorage) {
  //   return <Navigate to="/admin/dashboard" />;
  // }

  return <LoginForm />;
};

export default Login;

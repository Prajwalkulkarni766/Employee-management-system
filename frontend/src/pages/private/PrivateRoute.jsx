import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.token.token);
  const cookieToken = Cookies.get("authToken");

  if (!token && !cookieToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

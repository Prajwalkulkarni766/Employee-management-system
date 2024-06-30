import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const tokenFromStore = useSelector((state) => state.token.token);
  const tokenFromLocalStorage = localStorage.getItem("authToken");

  if (!tokenFromStore && !tokenFromLocalStorage) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

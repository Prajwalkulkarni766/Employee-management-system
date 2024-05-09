import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.token.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

import EmployeeForm from "./pages/private/EmployeeForm";
import Login from "./pages/public/Login";
import DashBoard from "./pages/private/DashBoard";
import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/public/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
  },
  {
    path: "employee",
    element: (
      <PrivateRoute>
        <EmployeeForm />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function NotFound() {
  return <div>Page not found!</div>;
}

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

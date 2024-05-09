import EmployeeForm from "./pages/private/EmployeeForm";
import Login from "./pages/public/Login";
import DashBoard from "./pages/private/DashBoard";
import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;

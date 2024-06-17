import EmployeeForm from "./pages/private/EmployeeForm";
import Login from "./pages/public/Login";
import DashBoard from "./pages/private/DashBoard";
import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEmployee from "./pages/private/AddEmployee";
import AllEmployee from "./pages/private/AllEmployee";
import EmployeeProfile from "./pages/private/EmployeeProfile";
import AllLeave from "./pages/private/AllLeave";
import LeaveBalance from "./pages/private/LeaveBalance";
import LeaveType from "./pages/private/LeaveType";
import AllHoliday from "./pages/private/AllHoliday";
import AddHoliday from "./pages/private/AddHoliday";
import EditHoliday from "./pages/private/EditHoliday";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <>
        <Navbar component={DashBoard} />
      </>
    ),
  },
  {
    path: "employees/allemployee",
    element: (
      <>
        <Navbar component={AllEmployee} />
      </>
    ),
  },
  {
    path: "employees/addemployee",
    element: (
      <>
        <Navbar component={AddEmployee} />
      </>
    ),
  },
  {
    path: "employees/editemployee",
    element: (
      <>
        <Navbar component={AddEmployee} />
      </>
    ),
  },
  {
    path: "employees/employeeprofile",
    element: (
      <>
        <Navbar component={EmployeeProfile} />
      </>
    ),
  },
  {
    path: "leavemanagement/allleave",
    element: (
      <>
        <Navbar component={AllLeave} />
      </>
    ),
  },
  {
    path: "leavemanagement/leavebalance",
    element: (
      <>
        <Navbar component={LeaveBalance} />
      </>
    ),
  },
  {
    path: "leavemanagement/leavetype",
    element: (
      <>
        <Navbar component={LeaveType} />
      </>
    ),
  },
  {
    path: "holiday/allholiday",
    element: (
      <>
        <Navbar component={AllHoliday} />
      </>
    ),
  },
  {
    path: "holiday/addholiday",
    element: (
      <>
        <Navbar component={AddHoliday} />
      </>
    ),
  },
  {
    path: "holiday/editholiday",
    element: (
      <>
        <Navbar component={EditHoliday} />
      </>
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
      {/* <Navbar /> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

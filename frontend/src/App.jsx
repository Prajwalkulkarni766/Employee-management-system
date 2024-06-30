import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// navigation menu / bar
import AdminNavbar from "./components/AdminNavbar";
import EmployeeNavBar from "./components/EmployeeNavBar";

// login page
import Login from "./pages/public/Login";

// dashboard page
import DashBoard from "./pages/private/DashBoard";

// employee pages
import AddEmployee from "./pages/private/employee/AddEmployee";
import AllEmployee from "./pages/private/employee/AllEmployee";
import EmployeeProfile from "./pages/private/employee/EmployeeProfile";
import EditEmployee from "./pages/private/employee/EditEmployee";

// leave pages
import AllLeave from "./pages/private/leave/AllLeave";
import LeaveBalance from "./pages/private/leave/LeaveBalance";

// holiday pages
import AllHoliday from "./pages/private/holiday/AllHoliday";
import AddHoliday from "./pages/private/holiday/AddHoliday";
import EditHoliday from "./pages/private/holiday/EditHoliday";

// attendance pages
import EmployeeAttendance from "./pages/private/attendance/EmployeeAttendance";

// payroll pages
import EmployeeSalary from "./pages/private/payroll/EmployeeSalary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "admin/dashboard",
    element: (
      <PrivateRoute>
        <AdminNavbar component={DashBoard} />
      </PrivateRoute>
    ),
  },
  {
    path: "employee/dashboard",
    element: (
      <PrivateRoute>
        <EmployeeNavBar component={DashBoard} />
        {/* <p>hello</p> */}
      </PrivateRoute>
    ),
  },
  {
    path: "admin/employees/allemployee",
    element: (
      <>
        <AdminNavbar component={AllEmployee} />
      </>
    ),
  },
  {
    path: "admin/employees/addemployee",
    element: (
      <>
        <AdminNavbar component={AddEmployee} />
      </>
    ),
  },
  {
    path: "admin/employees/editemployee",
    element: (
      <>
        <AdminNavbar component={EditEmployee} />
      </>
    ),
  },
  {
    path: "admin/employees/employeeprofile",
    element: (
      <>
        <AdminNavbar component={EmployeeProfile} />
      </>
    ),
  },
  {
    path: "admin/leavemanagement/allleave",
    element: (
      <>
        <AdminNavbar component={AllLeave} />
      </>
    ),
  },
  {
    path: "admin/leavemanagement/leavebalance",
    element: (
      <>
        <AdminNavbar component={LeaveBalance} />
      </>
    ),
  },
  {
    path: "admin/holiday/allholiday",
    element: (
      <>
        <AdminNavbar component={AllHoliday} />
      </>
    ),
  },
  {
    path: "admin/holiday/addholiday",
    element: (
      <>
        <AdminNavbar component={AddHoliday} />
      </>
    ),
  },
  {
    path: "admin/holiday/editholiday",
    element: (
      <>
        <AdminNavbar component={EditHoliday} />
      </>
    ),
  },
  {
    path: "admin/attendence/employeeattendence",
    element: (
      <>
        <AdminNavbar component={EmployeeAttendance} />
      </>
    ),
  },
  {
    path: "admin/payroll/employeesalary",
    element: (
      <>
        <AdminNavbar component={EmployeeSalary} />
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
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

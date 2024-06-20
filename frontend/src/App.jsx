import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// navigation menu / bar
import Navbar from "./components/Navbar";

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
import AttendanceSheet from "./pages/private/attendance/AttendanceSheet";
import EmployeeAttendance from "./pages/private/attendance/EmployeeAttendance";
import TodayAttendance from "./pages/private/attendance/TodayAttendance";

// payroll pages
import EmployeeSalary from "./pages/private/payroll/EmployeeSalary";
import Payslip from "./pages/private/payroll/Payslip";

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
        <Navbar component={EditEmployee} />
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
    path: "attendence/todaysattendence",
    element: (
      <>
        <Navbar component={TodayAttendance} />
      </>
    ),
  },
  {
    path: "attendence/employeeattendence",
    element: (
      <>
        <Navbar component={EmployeeAttendance} />
      </>
    ),
  },
  {
    path: "attendence/attendencesheet",
    element: (
      <>
        <Navbar component={AttendanceSheet} />
      </>
    ),
  },
  {
    path: "payroll/employeesalary",
    element: (
      <>
        <Navbar component={EmployeeSalary} />
      </>
    ),
  },
  {
    path: "payroll/payslip",
    element: (
      <>
        <Navbar component={Payslip} />
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

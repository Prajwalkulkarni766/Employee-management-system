import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// navigation menu / bar
import AdminNavbar from "./components/AdminNavbar";
import EmployeeNavBar from "./components/EmployeeNavBar";

// login page
import Login from "./pages/public/Login";

// admin page
// dashboard page
import DashBoard from "./pages/private/DashBoard";

// employee pages
import AddEmployee from "./pages/private/admin/employee/AddEmployee";
import AllEmployee from "./pages/private/admin/employee/AllEmployee";
import EmployeeProfile from "./pages/private/admin/employee/EmployeeProfile";
import EditEmployee from "./pages/private/admin/employee/EditEmployee";

// leave pages
import AllLeave from "./pages/private/admin/leave/AllLeave";

// holiday pages
import AllHoliday from "./pages/private/admin/holiday/AllHoliday";
import AddHoliday from "./pages/private/admin/holiday/AddHoliday";
import EditHoliday from "./pages/private/admin/holiday/EditHoliday";

// attendance pages
import EmployeeAttendance from "./pages/private/admin/attendance/EmployeeAttendance";

// payroll pages
import EmployeeSalary from "./pages/private/admin/payroll/EmployeeSalary";
import ReleaseSalary from "./pages/private/admin/payroll/ReleaseSalary";


// employee page
// attendance page
import TodayAttendance from "./pages/private/employee/attendance/TodayAttendance"

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
    path: "admin/payroll/releasesalary",
    element: (
      <>
        <AdminNavbar component={ReleaseSalary} />
      </>
    ),
  },
  {
    path: "employee/dashboard",
    element: (
      <PrivateRoute>
        <EmployeeNavBar component={DashBoard} />
      </PrivateRoute>
    ),
  },
  {
    path: "employee/attendence/todaysattendence",
    element: (
      <>
        <EmployeeNavBar component={TodayAttendance} />
      </>
    ),
  },
  {
    path: "employee/attendence/attendencesheet",
    element: (
      <>
        {/* <EmployeeNavBar component={AllLeave} /> */}
        this is attendencesheet
      </>
    ),
  },
  {
    path: "employee/leavemanagement/allleave",
    element: (
      <>
        {/* <EmployeeNavBar component={AllLeave} /> */}
        this is all leave 
      </>
    ),
  },
  {
    path: "employee/leavemanagement/leavebalance",
    element: (
      <>
        {/* <EmployeeNavBar component={AllLeave} /> */}
        this is leavebalance 
      </>
    ),
  },
  {
    path: "employee/holiday/allholiday",
    element: (
      <>
        {/* <EmployeeNavBar component={AllLeave} /> */}
        this is all holiday 
      </>
    ),
  },
  {
    path: "employee/payroll/employeesalary",
    element: (
      <>
        {/* <EmployeeNavBar component={AllLeave} /> */}
        this is salary
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
      <Loading />
    </>
  );
}

export default App;

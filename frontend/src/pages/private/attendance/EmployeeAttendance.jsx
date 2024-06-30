import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect, useState } from "react";
import Toast from "../../../helper/Toast";
import dayjs from "dayjs";

export default function EmployeeAttendance() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "checkIn", headerName: "Check In", flex: 1 },
    { field: "checkOut", headerName: "Check Out", flex: 1 },
    { field: "workingHours", headerName: "Working Hours", flex: 1 },
    { field: "workingStatus", headerName: "Working Status", flex: 1 },
  ];

  useEffect(() => {
    // fetching data from server
    (async () => {
      try {
        let formattedToday = dayjs().format("YYYY-MM-DD");

        const response = await axiosInstance.get(
          `/api/v1/attendance/reportInText?fromDate=${formattedToday}&toDate=${formattedToday}`
        );
        let i = 1;

        if (response.status === 200) {
          for (const attendanceData of response.data) {
            attendanceData.id = i++;
            attendanceData.name =
              attendanceData.firstName + attendanceData.lastName;
          }
          setRows(response.data);
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    })();
  }, []);

  return (
    <>
      <PageHeading pageName="Employee Attendance" />
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

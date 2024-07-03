import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect, useState } from "react";
import Toast from "../../../helper/Toast";
import dayjs from "dayjs";
import MyDatePicker from "../../../components/MyDatePicker";
import { Paper } from "@mui/material";

export default function EmployeeAttendance() {
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

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

  const fetchAttendanceData = async (selectedDate) => {
    try {
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      const response = await axiosInstance.get(
        `/v1/attendance/reportInText?fromDate=${formattedDate}&toDate=${formattedDate}`
      );

      if (response.status === 200) {
        let i = 1;
        const formattedData = response.data.map((attendanceData) => ({
          ...attendanceData,
          id: i++,
          name: `${attendanceData.firstName} ${attendanceData.lastName}`,
        }));
        setRows(formattedData);
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchAttendanceData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
  };

  return (
    <>
      <PageHeading pageName="Employee Attendance" />
      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <MyDatePicker value={selectedDate} onChange={handleDateChange} />
      </Paper>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import { useEffect, useState } from "react";
import MyMonthSelector from "../../../../components/MyMonthSelector";
import dayjs from "dayjs";
import axiosInstance from "../../../../axios/axiosInstance";
import Toast from "../../../../helper/Toast";

export default function EmployeeAttendance() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "checkIn", headerName: "Check In", flex: 1 },
    { field: "checkOut", headerName: "Check Out", flex: 1 },
    { field: "workingHours", headerName: "Working Hours", flex: 1 },
    { field: "workingStatus", headerName: "Working Status", flex: 1 },
  ];

  const fetchAttendanceData = async () => {
    try {
      const startingOfSelectedMonth = dayjs()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .startOf("month")
        .format("YYYY-MM-DD");

      const endingOfSelectedMonth = dayjs()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .endOf("month")
        .format("YYYY-MM-DD");

      const response = await axiosInstance.get(
        `/v1/attendance/getAllAtteandanceData?date[gte]=${startingOfSelectedMonth}&date[lte]=${endingOfSelectedMonth}`
      );

      if (response.status === 200) {
        // add new attribute id
        let i = 1;
        for (const attendanceData of response.data.data) {
          attendanceData.id = i++;
          attendanceData.date = dayjs(attendanceData.date).format("DD-MM-YYYY");
          if (attendanceData.checkIn) {
            attendanceData.checkIn = dayjs(attendanceData.checkIn).format(
              "HH:mm"
            );
          }
          if (attendanceData.checkOut) {
            attendanceData.checkOut = dayjs(attendanceData.checkOut).format(
              "HH:mm"
            );
          }
        }

        setRows(response.data.data);
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
    fetchAttendanceData();
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <PageHeading pageName={"Attendance Sheet"} />
      <MyMonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

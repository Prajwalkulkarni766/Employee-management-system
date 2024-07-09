import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import { IconButton } from "@mui/material";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import dayjs from "dayjs";
import Toast from "../../../helper/Toast";
import MyMonthSelector from "../../../components/MyMonthSelector";

export default function EmployeeSalary() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "mobileNumber", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "salary", headerName: "Salary", flex: 1 },
    {
      field: "Payslip",
      headerName: "Payslip",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton>
          <FileDownloadIcon onClick={() => handleEdit(params.row.id)} />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fromDate = dayjs(`${selectedYear}-${selectedMonth}-01`).format(
          "YYYY-MM-DD"
        );
        const toDate = dayjs(
          `${selectedYear}-${selectedMonth}-${dayjs(
            `${selectedYear}-${selectedMonth}`
          ).daysInMonth()}`
        ).format("YYYY-MM-DD");

        const response = await axiosInstance(
          `/v1/payroll?fromDate=${fromDate}&toDate=${toDate}`
        );

        if (response.status === 200) {
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

    fetchData();
  }, [selectedYear, selectedMonth]);

  return (
    <>
      <PageHeading pageName="Employee Salary" />
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

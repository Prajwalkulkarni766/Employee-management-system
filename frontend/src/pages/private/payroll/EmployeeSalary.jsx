import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import { IconButton } from "@mui/material";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import dayjs from "dayjs";
import Toast from "../../../helper/Toast";

export default function EmployeeSalary() {
  const [rows, setRows] = useState([]);

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

  // const rows = [
  //   {
  //     id: 3,
  //     image: user1,
  //     Name: "Lannister",
  //     Department: "Accounting",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fromDate = dayjs().startOf("month").format("YYYY-MM-DD");
        const toDate = dayjs().endOf("month").format("YYYY-MM-DD");

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
  }, []);

  return (
    <>
      <PageHeading pageName="Employee Salary" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

import React, { useState, useEffect } from 'react';
import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import { IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axiosInstance from "../../../../axios/axiosInstance";
import dayjs from "dayjs";
import MyMonthSelector from "../../../../components/MyMonthSelector";
import Toast from "../../../../helper/Toast";
import DownloadPdf from '../../../../pdf/index';

export default function EmployeeSalary() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [htmlContent, setHtmlContent] = useState('');

  const fetchSalary = async (employeeId) => {
    try {
      const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
      const monthName = date.format('MMMM');
      const response = await axiosInstance.get(`/v1/payroll/generatePaySlip?employeeId=${employeeId}&payMonth=${monthName} ${selectedYear}`);

      setHtmlContent(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  const handleDownload = async (id) => {
    await fetchSalary(id);

    if (htmlContent) {
      DownloadPdf(htmlContent)
    }
  };

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "employeeId", headerName: "EMP-ID", flex: 1 },
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
          <FileDownloadIcon onClick={() => handleDownload(params.row.employeeId)} />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
        const monthName = date.format('MMMM');
        const response = await axiosInstance(`/v1/payroll?payMonth=${monthName} ${selectedYear}`);

        if (response.status === 200) {
          setRows(response.data.data);
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
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

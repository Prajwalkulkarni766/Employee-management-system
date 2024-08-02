// import PageHeading from "../../../../components/PageHeading";
// import DataTable from "../../../../components/DataTable";
// import { IconButton, responsiveFontSizes } from "@mui/material";
// import { useState } from "react";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { useEffect } from "react";
// import axiosInstance from "../../../../axios/axiosInstance";
// import dayjs from "dayjs";
// import MyMonthSelector from "../../../../components/MyMonthSelector";
// import Toast from "../../../../helper/Toast";
// import generatePDF from "../../../../pdf/generatePDF";

// export default function EmployeeSalary() {
//   const [rows, setRows] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
//   const [selectedYear, setSelectedYear] = useState(dayjs().year());

//   const fetchSalary = async (employeeId) => {
//     const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
//     const monthName = date.format('MMMM');
//     const response = await axiosInstance.get(`/v1/payroll/generatePaySlip?employeeId=${employeeId}&payMonth=${monthName} ${selectedYear}`);

//     const htmlContent = response.data;

//     await generatePDF(htmlContent)
//   }

//   const handleDownload = (id) => {
//     fetchSalary(id)
//   }

//   const columns = [
//     { field: "id", headerName: "Sr. No", flex: 1 },
//     { field: "employeeId", headerName: "EMP-ID", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "department", headerName: "Department", flex: 1 },
//     { field: "role", headerName: "Role", flex: 1 },
//     { field: "mobileNumber", headerName: "Mobile", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "salary", headerName: "Salary", flex: 1 },
//     {
//       field: "Payslip",
//       headerName: "Payslip",
//       flex: 1,
//       sortable: false,
//       filterable: false,
//       align: "center",
//       headerAlign: "center",
//       renderCell: (params) => (
//         <IconButton>
//           <FileDownloadIcon onClick={() => handleDownload(params.row.employeeId)} />
//         </IconButton>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
//         const monthName = date.format('MMMM');

//         const response = await axiosInstance(
//           `/v1/payroll?payMonth=${monthName} ${selectedYear}`
//         );

//         if (response.status === 200) {
//           setRows(response.data.data);
//         } else {
//           throw new Error("Unexpected status code received");
//         }
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || "An error occurred.";
//         Toast.error(errorMessage);
//       }
//     };

//     fetchData();
//   }, [selectedYear, selectedMonth]);

//   return (
//     <>
//       {/* 

//     TODO: add functionality to download payslip

//     */}
//       <PageHeading pageName="Employee Salary" />
//       <MyMonthSelector
//         selectedMonth={selectedMonth}
//         selectedYear={selectedYear}
//         setSelectedMonth={setSelectedMonth}
//         setSelectedYear={setSelectedYear}
//       />
//       <DataTable columns={columns} rows={rows} />
//     </>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import PageHeading from "../../../../components/PageHeading";
// import DataTable from "../../../../components/DataTable";
// import { IconButton } from "@mui/material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import axiosInstance from "../../../../axios/axiosInstance";
// import dayjs from "dayjs";
// import MyMonthSelector from "../../../../components/MyMonthSelector";
// import Toast from "../../../../helper/Toast";
// import GeneratePDF from "../../../../pdf/generatePDF";

// export default function EmployeeSalary() {
//   const [rows, setRows] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
//   const [selectedYear, setSelectedYear] = useState(dayjs().year());
//   const [pdfContent, setPdfContent] = useState('');

//   const fetchSalary = async (employeeId) => {
//     try {
//       const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
//       const monthName = date.format('MMMM');
//       const response = await axiosInstance.get(`/v1/payroll/generatePaySlip?employeeId=${employeeId}&payMonth=${monthName} ${selectedYear}`);

//       setPdfContent(response.data);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "An error occurred.";
//       Toast.error(errorMessage);
//     }
//   };

//   const handleDownload = (id) => {
//     fetchSalary(id);
//   };

//   const columns = [
//     { field: "id", headerName: "Sr. No", flex: 1 },
//     { field: "employeeId", headerName: "EMP-ID", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "department", headerName: "Department", flex: 1 },
//     { field: "role", headerName: "Role", flex: 1 },
//     { field: "mobileNumber", headerName: "Mobile", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "salary", headerName: "Salary", flex: 1 },
//     {
//       field: "Payslip",
//       headerName: "Payslip",
//       flex: 1,
//       sortable: false,
//       filterable: false,
//       align: "center",
//       headerAlign: "center",
//       renderCell: (params) => (
//         <IconButton>
//           <FileDownloadIcon onClick={() => handleDownload(params.row.employeeId)} />
//         </IconButton>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const date = dayjs(`${selectedYear}-${selectedMonth}-01`);
//         const monthName = date.format('MMMM');
//         const response = await axiosInstance(`/v1/payroll?payMonth=${monthName} ${selectedYear}`);

//         if (response.status === 200) {
//           setRows(response.data.data);
//         } else {
//           throw new Error("Unexpected status code received");
//         }
//       } catch (error) {
//         const errorMessage = error.response?.data?.message || "An error occurred.";
//         Toast.error(errorMessage);
//       }
//     };

//     fetchData();
//   }, [selectedYear, selectedMonth]);

//   return (
//     <>
//       <PageHeading pageName="Employee Salary" />
//       <MyMonthSelector
//         selectedMonth={selectedMonth}
//         selectedYear={selectedYear}
//         setSelectedMonth={setSelectedMonth}
//         setSelectedYear={setSelectedYear}
//       />
//       <DataTable columns={columns} rows={rows} />
//       {pdfContent && <GeneratePDF content={pdfContent} />}
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import { IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axiosInstance from "../../../../axios/axiosInstance";
import dayjs from "dayjs";
import MyMonthSelector from "../../../../components/MyMonthSelector";
import Toast from "../../../../helper/Toast";
import html2pdf from 'html2pdf.js';

export default function EmployeeSalary() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [htmlContent, setHtmlContent] = useState('');

  /*
TODO: add a centeral function to download pdf

  */

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
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);

      const opt = {
        margin: [15, 15, 15, 15],
        filename: 'payslip.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: [200, 270] }
      };

      html2pdf().from(element).set(opt).save().finally(() => {
        document.body.removeChild(element); // Clean up
      });
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

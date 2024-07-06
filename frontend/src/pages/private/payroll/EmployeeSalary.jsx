import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import user1 from "../../../assets/user1.jpg";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function EmployeeSalary() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {" "}
          <img
            src={params.value}
            style={{ borderRadius: "50%" }}
            alt="Employee"
          />
        </div>
      ),
    },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
    { field: "Role", headerName: "Role", flex: 1 },
    { field: "Mobile", headerName: "Mobile", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Salary", headerName: "Salary", flex: 1 },
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
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Paid</MenuItem>
          </Menu>
        </>
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
  //   {
  //     id: 4,
  //     image: user1,
  //     Name: "Stark",
  //     Department: "Developer",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  //   {
  //     id: 5,
  //     image: user1,
  //     Name: "Targaryen",
  //     Department: "Accounting",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  //   {
  //     id: 6,
  //     image: user1,
  //     Name: "Melisandre",
  //     Department: "Developer",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  //   {
  //     id: 7,
  //     image: user1,
  //     Name: "Clifford",
  //     Department: "Accounting",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  //   {
  //     id: 8,
  //     image: user1,
  //     Name: "Frances",
  //     Department: "Accounting",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  //   {
  //     id: 9,
  //     image: user1,
  //     Name: "Roxie",
  //     Department: "Developer",
  //     Role: "Designer",
  //     Degree: "C.E.",
  //     Mobile: "1234567890",
  //     Email: "test@email.com",
  //     Salary: 1000,
  //   },
  // ];

  return (
    <>
      <PageHeading pageName="Employee Salary" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

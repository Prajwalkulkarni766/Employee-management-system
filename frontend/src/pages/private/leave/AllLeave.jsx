import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import user1 from "../../../assets/user1.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const options = ["Approve", "Reject"];

export default function AllLeave() {
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
    { field: "LeaveType", headerName: "Leave Type", flex: 1 },
    { field: "LeaveFrom", headerName: "Leave From", flex: 1 },
    { field: "LeaveTo", headerName: "Leave To", flex: 1 },
    { field: "NumberOfDays", headerName: "No of Days", flex: 1 },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={`${params.value}`}
          color={
            (params.value === "Approved" && "success") ||
            (params.value === "Rejected" && "error") ||
            (params.value === "Pending" && "warning")
          }
          variant="outlined"
        />
      ),
    },
    { field: "Reason", headerName: "Reason", flex: 1 },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.row.Status !== "Approved" &&
            params.row.Status !== "Rejected" && (
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {options.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      image: user1,
      Name: "Snow",
      LeaveType: "Medical",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Pending",
      Reason: "02/25/2018",
    },
    {
      id: 2,
      image: user1,
      Name: "Lannister",
      LeaveType: "Casual",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Approved",
      Reason: "02/25/2018",
    },
    {
      id: 3,
      image: user1,
      Name: "Lannister",
      LeaveType: "Medical",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 4,
      image: user1,
      Name: "Stark",
      LeaveType: "Casual",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 5,
      image: user1,
      Name: "Targaryen",
      LeaveType: "Medical",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 6,
      image: user1,
      Name: "Melisandre",
      LeaveType: "Casual",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 7,
      image: user1,
      Name: "Clifford",
      LeaveType: "Medical",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 8,
      image: user1,
      Name: "Frances",
      LeaveType: "Medical",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
    {
      id: 9,
      image: user1,
      Name: "Roxie",
      LeaveType: "Casual",
      LeaveFrom: "02/25/2018",
      LeaveTo: "02/25/2018",
      NumberOfDays: "1234567890",
      Status: "Rejected",
      Reason: "02/25/2018",
    },
  ];

  return (
    <>
      <PageHeading pageName="All Leave" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

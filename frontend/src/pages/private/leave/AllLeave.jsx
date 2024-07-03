import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import user1 from "../../../assets/user1.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "../../../axios/axiosInstance";
import Toast from "../../../helper/Toast";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function AllLeave() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleApproveAndReject = async (row, leaveStatus) => {
    try {
      const response = await axiosInstance.patch(`/v1/leave`, {
        leaveId: row._id,
        leaveStatus: leaveStatus,
      });
      console.log(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
    setAnchorEl(null);
  };

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "_id", headerName: "_id", flex: 1, hide: true },
    { field: "employeeId", headerName: "Name", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "leaveStartDate", headerName: "Leave From", flex: 1 },
    { field: "leaveEndDate", headerName: "Leave To", flex: 1 },
    { field: "leaveDuration", headerName: "No of Days", flex: 1 },
    {
      field: "leaveStatus",
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
    { field: "leaveReason", headerName: "Reason", flex: 1 },
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
          {params.row.leaveStatus !== "Approved" &&
            params.row.leaveStatus !== "Rejected" && (
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
          <Menu anchorEl={anchorEl} open={open}>
            <MenuItem
              onClick={() => handleApproveAndReject(params.row, "Approved")}
            >
              Approve
            </MenuItem>
            <MenuItem
              onClick={() => handleApproveAndReject(params.row, "Rejected")}
            >
              Reject
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  useEffect(() => {
    // Fetching data from server based on selected month and year
    const fetchLeaveData = async () => {
      try {
        const fromDate = dayjs(`${selectedYear}-${selectedMonth}-01`).format(
          "YYYY-MM-DD"
        );
        const toDate = dayjs(`${selectedYear}-${selectedMonth}`)
          .endOf("month")
          .format("YYYY-MM-DD");

        const response = await axiosInstance.get(
          `/v1/leave?fromDate=${fromDate}&toDate=${toDate}`
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

    fetchLeaveData();
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <PageHeading pageName="All Leave" />

      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"Month"}
            openTo="month"
            views={["year", "month"]}
            value={dayjs(`${selectedYear}-${selectedMonth}-01`)}
            onChange={(newValue) => {
              setSelectedMonth(newValue.month() + 1);
              setSelectedYear(newValue.year());
            }}
          />
        </LocalizationProvider>
      </Paper>

      <DataTable columns={columns} rows={rows} />
    </>
  );
}

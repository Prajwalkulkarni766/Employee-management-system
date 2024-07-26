import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "../../../../axios/axiosInstance";
import dayjs from "dayjs";
import MyMonthSelector from "../../../../components/MyMonthSelector"
import Toast from "../../../../helper/Toast"

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

      if (response.status === 200) {
        const updatedRows = rows.map((r) =>
          r._id === row._id ? { ...r, leaveStatus: leaveStatus } : r
        );
        setRows(updatedRows);
      }
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
          `/v1/leave?leaveStartDate[gte]=${fromDate}&leaveEndDate[lte]=${toDate}`
        );

        if (response.status === 200) {
          let i = 1;
          for (const leave of response.data.data) {
            leave.id = i++;
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

    fetchLeaveData();
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <PageHeading pageName="All Leave" />
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

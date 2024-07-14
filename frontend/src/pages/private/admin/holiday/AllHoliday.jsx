import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../axios/axiosInstance";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHoliday } from "../../../../redux/holiday/index.slice";
import MyYearPicker from "../../../../components/MyYearPicker";
import dayjs from "dayjs";

export default function AllHoliday() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs());

  const setHolidayInStore = (holiday) => {
    dispatch(setHoliday(holiday));
  };

  const handleEdit = (holiday) => {
    setHolidayInStore(holiday);
    navigate("/admin/holiday/editholiday");
  };

  const handleDelete = async (holiday) => {
    try {
      const { holidayId } = holiday;

      const response = await axiosInstance.delete(
        `/api/v1/holiday?holidayId=${holidayId}`
      );

      if (response.status === 204) {
        setRows((prevRows) =>
          prevRows.filter((row) => row.holidayId !== holidayId)
        );
        Toast.success("Holiday deleted successfully");
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    {
      field: "name",
      headerName: "Holiday Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton>
          <EditIcon onClick={() => handleEdit(params.row)} />
        </IconButton>
      ),
    },
    {
      field: "view",
      headerName: "View",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton>
          <VisibilityIcon onClick={() => handleEdit(params.row)} />
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
        <IconButton>
          <DeleteIcon onClick={() => handleDelete(params.row)} />
        </IconButton>
      ),
    },
  ];

  const fetchHolidayData = async (selectedYear) => {
    try {
      const startingOfYear = dayjs()
        .year(selectedYear.year())
        .startOf("year")
        .format("YYYY-MM-DD");
      const endingOfYear = dayjs()
        .year(selectedYear.year())
        .endOf("year")
        .format("YYYY-MM-DD");

      const response = await axiosInstance.get(
        `/v1/holiday?date[gte]=${startingOfYear}&date[lte]=${endingOfYear}`
      );

      let i = 1;

      if (response.status === 200 || response.status === 201) {
        // add new attribute id
        for (const holiday of response.data.data) {
          holiday.id = i++;
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
    fetchHolidayData(selectedYear);
  }, [selectedYear]);

  const changeSelectedYear = (date) => {
    setSelectedYear(dayjs(date));
  };

  return (
    <>
      <PageHeading pageName="All Holiday" />
      <MyYearPicker
        selectedYear={selectedYear}
        setSelectedYear={changeSelectedYear}
      />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

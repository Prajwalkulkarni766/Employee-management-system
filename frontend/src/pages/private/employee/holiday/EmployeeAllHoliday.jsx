import PageHeading from "../../../../components/PageHeading";
import DataTable from "../../../../components/DataTable";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../axios/axiosInstance";
import MyYearPicker from "../../../../components/MyYearPicker";
import dayjs from "dayjs";

export default function AddHoliday() {
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs());

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
  ];

  const fetchHolidayData = async (selectedYear) => {
    try {
      const startingOfYear = dayjs().year(selectedYear.year()).startOf("year");
      const endingOfYear = dayjs().year(selectedYear.year()).endOf("year");

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

  const changeSelectedYear = (date) => {
    setSelectedYear(dayjs(date));
  };

  useEffect(() => {
    fetchHolidayData(selectedYear);
  }, [selectedYear]);

  return (
    <>
      <PageHeading pageName={"All Holiday"} />
      <MyYearPicker
        selectedYear={selectedYear}
        setSelectedYear={changeSelectedYear}
      />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";

export default function AllHoliday() {
  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    {
      field: "HolidayName",
      headerName: "Holiday Name",
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Details",
      headerName: "Details",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 2,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 3,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 4,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 5,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 6,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 7,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 8,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
    {
      id: 9,
      HolidayName: "Abc",
      Date: "21-01-2024",
      Details: "hello",
    },
  ];

  return (
    <>
      <PageHeading pageName="All Holiday" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

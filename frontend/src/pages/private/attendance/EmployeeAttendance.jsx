import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";

export default function EmployeeAttendance() {
  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
    { field: "Role", headerName: "Role", flex: 1 },
    { field: "CheckIn", headerName: "Check In", flex: 1 },
    { field: "CheckOut", headerName: "Check Out", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      Name: "Snow",
      Department: "Accounting",
      Role: "Designer",
      CheckIn: "10:30",
      CheckOut: "6:30",
    },
    {
      id: 2,
      Name: "Lannister",
      Department: "Developer",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 3,
      Name: "Lannister",
      Department: "Accounting",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 4,
      Name: "Stark",
      Department: "Developer",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 5,
      Name: "Targaryen",
      Department: "Accounting",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 6,
      Name: "Melisandre",
      Department: "Developer",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 7,
      Name: "Clifford",
      Department: "Accounting",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 8,

      Name: "Frances",
      Department: "Accounting",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
    {
      id: 9,

      Name: "Roxie",
      Department: "Developer",
      Role: "Designer",
      CheckIn: "10",
      CheckOut: "6",
    },
  ];

  return (
    <>
      <PageHeading pageName="Employee Attendance" />
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

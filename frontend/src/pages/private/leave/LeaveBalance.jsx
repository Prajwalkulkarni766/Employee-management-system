import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import user1 from "../../../assets/user1.jpg";
import * as React from "react";

export default function LeaveType() {
  const columns = [
    { field: "id", headerName: "Sr. No", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {" "}
          <img
            src={params.value}
            style={{ borderRadius: "50%" }}
            alt="Employee"
          />
        </div>
      ),
    },
    {
      field: "PreviousYear",
      headerName: "Previous Year",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Total",
      headerName: "Total",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Used",
      headerName: "Used",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Pending",
      headerName: "Pending",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Rejected",
      headerName: "Rejected",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      image: user1,
      Name: "Snow",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 2,
      image: user1,
      Name: "Lannister",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 3,
      image: user1,
      Name: "Lannister",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 4,
      image: user1,
      Name: "Stark",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 5,
      image: user1,
      Name: "Targaryen",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 6,
      image: user1,
      Name: "Melisandre",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 7,
      image: user1,
      Name: "Clifford",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 8,
      image: user1,
      Name: "Frances",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
    {
      id: 9,
      image: user1,
      Name: "Roxie",
      PreviousYear: 10,
      Total: 20,
      Used: 15,
      Pending: 2,
      Rejected: 5,
    },
  ];

  return (
    <>
      <PageHeading pageName="Leave Balance" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

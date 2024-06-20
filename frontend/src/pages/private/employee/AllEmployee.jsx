import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import user1 from "../../../assets/user1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function AllEmployee() {
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
    { field: "Degree", headerName: "Degree", flex: 1 },
    { field: "Mobile", headerName: "Mobile", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "JoiningDate", headerName: "Joining Date", flex: 1 },
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
          <EditIcon onClick={() => handleEdit(params.row.id)} />
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
          <DeleteIcon onClick={() => handleDelete(params.row.id)} />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      image: user1,
      Name: "Snow",
      Department: "Accounting",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 2,
      image: user1,
      Name: "Lannister",
      Department: "Developer",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 3,
      image: user1,
      Name: "Lannister",
      Department: "Accounting",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 4,
      image: user1,
      Name: "Stark",
      Department: "Developer",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 5,
      image: user1,
      Name: "Targaryen",
      Department: "Accounting",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 6,
      image: user1,
      Name: "Melisandre",
      Department: "Developer",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 7,
      image: user1,
      Name: "Clifford",
      Department: "Accounting",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 8,
      image: user1,
      Name: "Frances",
      Department: "Accounting",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
    {
      id: 9,
      image: user1,
      Name: "Roxie",
      Department: "Developer",
      Role: "Designer",
      Degree: "C.E.",
      Mobile: "1234567890",
      Email: "test@email.com",
      JoiningDate: "02/25/2018",
    },
  ];

  return (
    <>
      <PageHeading pageName="All Employee" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

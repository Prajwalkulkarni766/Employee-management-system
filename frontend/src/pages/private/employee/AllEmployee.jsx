import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect, useState } from "react";
import Toast from "../../../helper/Toast";
import { useDispatch } from "react-redux";
import { setEmployee } from "../../../redux/employee/index.slice";
import { useNavigate } from "react-router-dom";
import { setEmployees } from "../../../redux/employees/index.slice";
import { useSelector } from "react-redux";
import { removeEmployee } from "../../../redux/employees/index.slice";

export default function AllEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const employees = useSelector((state) => state.employees.employees);

  const setEmployeeInStore = (employee) => {
    dispatch(setEmployee(employee));
  };

  const handleEdit = (employee) => {
    setEmployeeInStore(employee);
    navigate("/admin/employees/editemployee");
  };

  const handleView = (employee) => {
    setEmployeeInStore(employee);
    navigate("/admin/employees/employeeprofile");
  };

  const handleDelete = async (employee) => {
    try {
      const { employeeId } = employee;

      const response = await axiosInstance.delete(
        `/v1/employee?employeeId=${employeeId}`
      );

      if (response.status === 204) {
        dispatch(removeEmployee(employeeId));
        setRows((prevRows) =>
          prevRows.filter((row) => row.employeeId !== employeeId)
        );
        Toast.success("Employee deleted successfully");
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
    { field: "_id", headerName: "_id", flex: 1, hide: true },
    // {
    //   field: "image",
    //   headerName: "Image",
    //   flex: 1,
    //   sortable: false,
    //   filterable: false,
    //   renderCell: (params) => (
    //     <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
    //       {" "}
    //       <img
    //         src={params.value}
    //         style={{ borderRadius: "50%" }}
    //         alt="Employee"
    //       />
    //     </div>
    //   ),
    // },
    { field: "firstName", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "education", headerName: "Degree", flex: 1 },
    { field: "mobileNumber", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "joiningDate", headerName: "Joining Date", flex: 1 },
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
          <VisibilityIcon onClick={() => handleView(params.row)} />
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

  useEffect(() => {
    // if employees data is already present in the store else fetch that
    if (employees.length > 0) {
      setRows(employees);
    } else {
      (async () => {
        try {
          const response = await axiosInstance.get("/v1/employee");
          let i = 1;

          if (response.status === 200) {
            setRows(response.data.data);
            dispatch(setEmployees(response.data.data));
          } else {
            throw new Error("Unexpected status code received");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "An error occurred.";
          Toast.error(errorMessage);
        }
      })();
    }
  }, []);

  return (
    <>
      <PageHeading pageName="All Employee" />
      <DataTable columns={columns} rows={rows} />
    </>
  );
}

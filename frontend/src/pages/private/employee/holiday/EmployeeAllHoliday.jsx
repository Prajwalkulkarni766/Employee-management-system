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
        }
    ];

    return (
        <>
            <PageHeading pageName={"All Holiday"} />
            <DataTable columns={columns} rows={rows} />
        </>
    )
}
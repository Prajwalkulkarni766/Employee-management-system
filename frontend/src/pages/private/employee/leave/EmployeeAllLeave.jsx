import PageHeading from "../../../../components/PageHeading"
import DataTable from "../../../../components/DataTable"
import { useEffect, useState } from "react";
import MyYearPicker from "../../../../components/MyYearPicker"
import dayjs from "dayjs";

export default function EmployeeAllLeave() {
    const [rows, setRows] = useState([]);
    const [selectedYear, setSelectedYear] = useState(dayjs());

    const columns = [
        { field: "id", headerName: "Sr. No", flex: 1 },
        { field: "createdAt", headerName: "Date", flex: 1 },
        { field: "leaveType", headerName: "leaveType", flex: 1 },
        { field: "leaveReason", headerName: "leaveReason", flex: 1 },
        { field: "leaveStartDate", headerName: "leaveStartDate", flex: 1 },
        { field: "leaveEndDate", headerName: "leaveEndDate", flex: 1 },
        { field: "leaveDuration", headerName: "leaveDuration", flex: 1 },
        { field: "leaveStatus", headerName: "leaveStatus", flex: 1 },
    ];

    const changeSelectedYear = (date) => {
        setSelectedYear(dayjs(date));
    };

    return (
        <>
            <PageHeading pageName={"All Leave"} />
            <MyYearPicker
                selectedYear={selectedYear}
                setSelectedYear={changeSelectedYear}
            />
            <DataTable columns={columns} rows={rows} />
        </>
    )
}
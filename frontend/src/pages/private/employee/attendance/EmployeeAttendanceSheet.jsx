import PageHeading from "../../../../components/PageHeading"
import DataTable from "../../../../components/DataTable"
import { useEffect, useState } from "react";
import MyMonthSelector from "../../../../components/MyMonthSelector";
import dayjs from "dayjs";

export default function EmployeeAttendanceSheet() {
    const [rows, setRows] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const columns = [
        { field: "id", headerName: "Sr. No", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 },
        { field: "checkIn", headerName: "Check In", flex: 1 },
        { field: "checkOut", headerName: "Check Out", flex: 1 },
        { field: "workingHours", headerName: "Working Hours", flex: 1 },
        { field: "workingStatus", headerName: "Working Status", flex: 1 },
    ];

    return (
        <>
            <PageHeading pageName={"Attendance Sheet"} />
            <MyMonthSelector
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
            />
            <DataTable columns={columns} rows={rows} />
        </>
    )
}
import PageHeading from "../../../../components/PageHeading"
import DataTable from "../../../../components/DataTable"
import { useEffect, useState } from "react";
import MyYearPicker from "../../../../components/MyYearPicker"
import dayjs from "dayjs";
import axiosInstance from "../../../../axios/axiosInstance";

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


    const fetchLeaveData = async () => {
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
                `/v1/leave?leaveStartDate[gte]=${startingOfYear}&leaveEndDate[lte]=${endingOfYear}`
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
    }

    useEffect(() => {
        fetchLeaveData(selectedYear);
    }, [selectedYear]);

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
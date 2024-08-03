import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DownloadPdf from '../pdf/index';
import dayjs from 'dayjs';
import axiosInstance from '../axios/axiosInstance';
import { useSelector } from "react-redux"
import Toast from "../helper/Toast";

export default function SalaryUI() {

    const employee = useSelector((state) => state.employee.employee);
    const [htmlContent, setHtmlContent] = React.useState("Payslip not found this month");

    function generatePdf() {
        DownloadPdf(htmlContent)
    }

    const fetchData = async () => {
        try {
            const monthName = dayjs().startOf("month").format("MMMM");
            // const monthName = "April"
            const year = dayjs().startOf("month").format("YYYY");
            const employeeId = employee.employee.employeeId;

            const response = await axiosInstance.get(`/v1/payroll/generatePaySlip?employeeId=${employeeId}&payMonth=${monthName} ${year}`);

            if (response.status === 200) {
                setHtmlContent(response.data)
                document.getElementById("payslip-generator").innerHTML = htmlContent
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred.";
            Toast.error(errorMessage);
            document.getElementById("payslip-generator").innerHTML = htmlContent
        }
    }

    React.useEffect(() => {
        fetchData();
    })

    return (
        <Paper elevation={0} sx={{ width: "100%", p: 5 }}>
            <Button onClick={generatePdf}>Download Payslip as PDF</Button>
            <div id="payslip-generator" style={{ width: "100%" }}></div>
        </Paper>
    )
}
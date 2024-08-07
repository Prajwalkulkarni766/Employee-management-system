import PageHeading from "../../../../components/PageHeading";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LuggageIcon from "@mui/icons-material/Luggage";
import axiosInstance from "../../../../axios/axiosInstance";
import DashboardCards from "../../../../components/DashboardCards";
import dayjs from "dayjs"

function EarningChart({ data }) {
  const xAxisData = data.map(item => item.payMonth.split(" ")[0]);
  const seriesData = data.map(item => item.totalAmountPaid);

  return (
    <BarChart
      series={[
        { data: seriesData, label: "Total Amount Paid", id: "amountPaidId" },
      ]}
      xAxis={[{ data: xAxisData, scaleType: "band" }]}
      sx={{ width: '100%', height: '100%' }}
    />
  );
};

const WorkingHour = ({ data }) => {
  const dates = data.map((data) => dayjs(data.date).format("DD-M"));
  const hoursWorked = data.map((data) => data.totalWorkingHours);

  const lineChartData = [
    {
      data: hoursWorked,
      id: "workingHours",
      label: "Working Hours",
    },
  ];

  return (
    <>
      <Typography variant="h6">Employee Working Hours</Typography>
      <LineChart
        height={400}
        series={lineChartData}
        xAxis={[{ data: dates, scaleType: "point" }]}
        yAxisTitle="Hours"
        xAxisTitle="Date"
        title="Employee Working Hours"
        sx={{ width: '100%' }}
      />
    </>
  );
};

function EmpAttendance({ data }) {
  const employeeId = data.map((data) => data._id);
  const workingHour = data.map((data) => data.totalWorkingHours);

  return (
    <>
      <Typography variant="h6">All Employee Attendance in %</Typography>
      <BarChart
        height={500}
        series={[{ data: workingHour, id: "attendanceId" }]}
        xAxis={[{ data: employeeId, scaleType: "band" }]}
        yAxisTitle="Attendance (%)"
        xAxisTitle="Employees"
        title="Employee Attendance"
        barSeriesStyle={{
          rect: {
            fill: "#1976d2",
          },
        }}
        sx={{ width: '100%' }}
      />
    </>
  );
}

export default function DashBoard() {
  const [totalEmployeeWorking, setTotalEmployeeWorking] = useState(null);
  const [avgWorkingHours, setAvgWorkingHours] = useState(null);
  const [salaryExpenditure, setSalaryExpenditure] = useState(null);
  const [upcomingHoliday, setUpcomingHoliday] = useState(null);
  const [monthlySalaryDistibution, setMonthlySalaryDistibution] = useState([]);
  const [topAttendance, setTopAtteandance] = useState([]);
  const [wokingHours, setWorkingHours] = useState([])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/v1/dashboard");

      if (response.status === 200) {
        setTotalEmployeeWorking(response.data.data?.totalEmployeeWorking || "-")
        setSalaryExpenditure(response.data.data?.totalSalaryExpenditure || "-")
        setAvgWorkingHours(response.data.data?.avgWorkingHoursOfPreviousMonth || "-")
        setUpcomingHoliday(response.data.data?.nextHoliday || "-")
        setMonthlySalaryDistibution(response.data.data?.monthlySalaryDistibution || [])
        setTopAtteandance(response.data.data?.topTenAttendance || [])
        setWorkingHours(response.data.data?.avgWorkingHoursLastSevenDays || [])
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
    fetchDashboardData()
  }, [])

  return (
    <>
      <PageHeading pageName="Dashboard" />
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={3}>
          <DashboardCards icon={BadgeIcon} title={"Employees Working"} content={totalEmployeeWorking} />
          <DashboardCards icon={TimerIcon} title={"Avg Working Hours"} content={avgWorkingHours} />
          <DashboardCards icon={AttachMoneyIcon} title={"Salary Expenditure"} content={salaryExpenditure} />
          <DashboardCards icon={LuggageIcon} title={"Upcoming Holiday"} content={upcomingHoliday} />
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={3} sx={{ width: '100%', p: 2 }}>
              <WorkingHour data={wokingHours} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={3} sx={{ width: '100%', p: 2, height: 500 }}>
              <EarningChart data={monthlySalaryDistibution} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ width: '100%', p: 2 }}>
              <EmpAttendance data={topAttendance} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

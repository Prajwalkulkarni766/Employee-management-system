// import PageHeading from "../../../../components/PageHeading";
// import React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { Paper, Grid, Typography } from "@mui/material";
// import Box from "@mui/system/Box";
// import BadgeIcon from "@mui/icons-material/Badge";
// import TimerIcon from "@mui/icons-material/Timer";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import LuggageIcon from "@mui/icons-material/Luggage";
// import Stack from "@mui/material/Stack";

// const monthlySalaries = [7000, 6000, 8000, 7500, 9000, 6500, 7200];
// const yearlyBonuses = [1200, 1500, 1100, 1400, 1600, 1300, 1250];
// const departmentLabels = [
//   "HR",
//   "Finance",
//   "Engineering",
//   "Marketing",
//   "Sales",
//   "IT",
//   "Support",
// ];

// function EarningChart() {
//   return (
//     <BarChart
//       series={[
//         { data: monthlySalaries, label: "Monthly Salaries", id: "salariesId" },
//         { data: yearlyBonuses, label: "Yearly Bonuses", id: "bonusesId" },
//       ]}
//       xAxis={[{ data: departmentLabels, scaleType: "band" }]}
//     />
//   );
// }

// const employeeWorkingHours = [
//   { date: "2024-06-01", hours: 8 },
//   { date: "2024-06-02", hours: 7.5 },
//   { date: "2024-06-03", hours: 7 },
//   { date: "2024-06-04", hours: 8 },
//   { date: "2024-06-05", hours: 7 },
//   { date: "2024-06-06", hours: 8 },
//   { date: "2024-06-07", hours: 7.5 },
// ];

// const WorkingHour = () => {
//   // Extract dates and hours
//   const dates = employeeWorkingHours.map((data) => data.date);
//   const hoursWorked = employeeWorkingHours.map((data) => data.hours);

//   // Prepare data for the line chart
//   const lineChartData = [
//     {
//       data: hoursWorked,
//       id: "workingHours",
//       label: "Working Hours",
//     },
//   ];

//   return (
//     <>
//       <h3>Employee Working Hours Over Time</h3>
//       <LineChart
//         height={400}
//         series={lineChartData}
//         xAxis={[{ data: dates, scaleType: "point" }]}
//         yAxisTitle="Hours"
//         xAxisTitle="Date"
//         title="Employee Working Hours"
//       />
//     </>
//   );
// };

// const employeeAttendanceData = [
//   { name: "John", attendance: 95 },
//   { name: "Alice", attendance: 92 },
//   { name: "Bob", attendance: 88 },
//   { name: "Eve", attendance: 94 },
//   { name: "Michael", attendance: 90 },
//   { name: "Emma", attendance: 93 },
//   { name: "David", attendance: 91 },
// ];

// function EmpAttendence() {
//   // Extract employee names and attendance percentages
//   const employeeNames = employeeAttendanceData.map((data) => data.name);
//   const attendancePercentages = employeeAttendanceData.map(
//     (data) => data.attendance
//   );

//   return (
//     <>
//       <h3>All Emp Attendence in %</h3>
//       <BarChart
//         height={500}
//         series={[{ data: attendancePercentages, id: "attendanceId" }]}
//         xAxis={[{ data: employeeNames, scaleType: "band" }]}
//         yAxisTitle="Attendance (%)"
//         xAxisTitle="Employees"
//         title="Employee Attendance"
//         barSeriesStyle={{
//           rect: {
//             fill: "#1976d2",
//           },
//         }}
//       />
//     </>
//   );
// }

// const cards = [
//   {
//     icon: <BadgeIcon fontSize="large" />,
//     title: "Employees Working",
//     content: "100",
//   },
//   {
//     icon: <TimerIcon fontSize="large" />,
//     title: "Avg Working Hours",
//     content: "8",
//   },
//   {
//     icon: <AttachMoneyIcon fontSize="large" />,
//     title: "Salary Expenditure",
//     content: "100",
//   },
//   {
//     icon: <LuggageIcon fontSize="large" />,
//     title: "Upcoming Holiday",
//     content: "13-01-2024",
//   },
// ];

// export default function DashBoard() {
//   return (
//     <>
//       <PageHeading pageName="Dashboard" />

//       <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
//         <Grid container spacing={3}>
//           {cards.map((card, index) => (
//             <Grid item xs={3} key={index}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Stack spacing={2} direction="row">
//                   {card.icon}
//                   <Stack direction="column">
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       {card.title}
//                     </Typography>
//                     <Typography variant="body1">{card.content}</Typography>
//                   </Stack>
//                 </Stack>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       <Box sx={{ flexGrow: 1 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={6}>
//             <Paper elevation={3} sx={{ width: "100%", p: 2 }}>
//               <WorkingHour />
//             </Paper>
//           </Grid>
//           <Grid item xs={6}>
//             <Paper elevation={3} sx={{ width: "100%", p: 2, height: 500 }}>
//               <EarningChart />
//             </Paper>
//           </Grid>
//           <Grid item xs={6}>
//             <Paper elevation={3} sx={{ width: "100%", p: 2 }}>
//               <EmpAttendence />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }


import PageHeading from "../../../../components/PageHeading";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LuggageIcon from "@mui/icons-material/Luggage";
import Stack from "@mui/material/Stack";

const monthlySalaries = [7000, 6000, 8000, 7500, 9000, 6500, 7200];
const yearlyBonuses = [1200, 1500, 1100, 1400, 1600, 1300, 1250];
const departmentLabels = [
  "HR",
  "Finance",
  "Engineering",
  "Marketing",
  "Sales",
  "IT",
  "Support",
];

function EarningChart() {
  return (
    <BarChart
      series={[
        { data: monthlySalaries, label: "Monthly Salaries", id: "salariesId" },
        { data: yearlyBonuses, label: "Yearly Bonuses", id: "bonusesId" },
      ]}
      xAxis={[{ data: departmentLabels, scaleType: "band" }]}
      sx={{ width: '100%', height: '100%' }}
    />
  );
}

const employeeWorkingHours = [
  { date: "2024-06-01", hours: 8 },
  { date: "2024-06-02", hours: 7.5 },
  { date: "2024-06-03", hours: 7 },
  { date: "2024-06-04", hours: 8 },
  { date: "2024-06-05", hours: 7 },
  { date: "2024-06-06", hours: 8 },
  { date: "2024-06-07", hours: 7.5 },
];

const WorkingHour = () => {
  const dates = employeeWorkingHours.map((data) => data.date);
  const hoursWorked = employeeWorkingHours.map((data) => data.hours);

  const lineChartData = [
    {
      data: hoursWorked,
      id: "workingHours",
      label: "Working Hours",
    },
  ];

  return (
    <>
      <Typography variant="h6">Employee Working Hours Over Time</Typography>
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

const employeeAttendanceData = [
  { name: "John", attendance: 95 },
  { name: "Alice", attendance: 92 },
  { name: "Bob", attendance: 88 },
  { name: "Eve", attendance: 94 },
  { name: "Michael", attendance: 90 },
  { name: "Emma", attendance: 93 },
  { name: "David", attendance: 91 },
];

function EmpAttendance() {
  const employeeNames = employeeAttendanceData.map((data) => data.name);
  const attendancePercentages = employeeAttendanceData.map(
    (data) => data.attendance
  );

  return (
    <>
      <Typography variant="h6">All Employee Attendance in %</Typography>
      <BarChart
        height={500}
        series={[{ data: attendancePercentages, id: "attendanceId" }]}
        xAxis={[{ data: employeeNames, scaleType: "band" }]}
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

// TODO: make dashboard functional

const cards = [
  {
    icon: <BadgeIcon fontSize="large" />,
    title: "Employees Working",
    content: "100",
  },
  {
    icon: <TimerIcon fontSize="large" />,
    title: "Avg Working Hours",
    content: "8",
  },
  {
    icon: <AttachMoneyIcon fontSize="large" />,
    title: "Salary Expenditure",
    content: "100",
  },
  {
    icon: <LuggageIcon fontSize="large" />,
    title: "Upcoming Holiday",
    content: "13-01-2024",
  },
];

export default function DashBoard() {
  return (
    <>
      <PageHeading pageName="Dashboard" />

      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={2} direction="row">
                  {card.icon}
                  <Stack direction="column">
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body1">{card.content}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={3} sx={{ width: '100%', p: 2 }}>
              <WorkingHour />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={3} sx={{ width: '100%', p: 2, height: 500 }}>
              <EarningChart />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ width: '100%', p: 2 }}>
              <EmpAttendance />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

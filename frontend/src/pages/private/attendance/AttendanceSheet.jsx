import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import Chip from "@mui/material/Chip";
import { Paper, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const styles = {
  chip: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
};

function ColorChips({ color }) {
  return (
    <Tooltip
      title={
        (color === "success" && "Present") ||
        (color === "error" && "Absent") ||
        (color === "warning" && "Half Day")
      }
    >
      <Chip
        label=""
        color={color}
        sx={{
          ...styles.chip,
        }}
      />
    </Tooltip>
  );
}

export default function AttendanceSheet() {
  const columns = [{ field: "Name", headerName: "Name", flex: 1 }];

  for (let index = 1; index < 31; index++) {
    columns.push({
      field: `${index}`,
      headerName: `${index}`,
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => <ColorChips color={params.value} />,
    });
  }

  const rows = [
    {
      id: 1,
      Name: "Snow",
      1: "success",
      2: "error",
      3: "warning",
    },
  ];

  return (
    <>
      <PageHeading pageName="Attendance Sheet" />

      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"Month"}
            openTo="month"
            views={["year", "month"]}
            value={dayjs()}
            onMonthChange={(value) => {
              const month = value.$M + 1;
              const year = value.$y;
              console.log(month, year);
            }}
          />
        </LocalizationProvider>
      </Paper>

      <DataTable columns={columns} rows={rows} />
    </>
  );
}

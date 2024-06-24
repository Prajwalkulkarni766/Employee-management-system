import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Paper } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
        }}
      />
    </GridToolbarContainer>
  );
}

export default function DataTable({ columns, rows }) {
  return (
    <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        disableColumnSelector
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableColumnMenu
        disableColumnResize={true}
        disableRowSelectionOnClick={true}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Paper>
  );
}

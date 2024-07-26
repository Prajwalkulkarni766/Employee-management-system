import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../helper/Toast";
import Button from "@mui/material/Button";
import axiosInstance from "../axios/axiosInstance";
import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const columns = [
  { id: 'name', label: 'Employee Name', flex: 1 },
  { id: 'basic', label: 'Basic Salary', flex: 1 },
  { id: 'hra', label: 'HRA', flex: 1 },
  { id: 'da', label: 'DA', flex: 1 },
  { id: 'specialAllowances', label: 'Special Allowances', flex: 1 },
  { id: 'bonus', label: 'Bonus', flex: 1 },
  { id: 'providentFund', label: 'Provident Fund', flex: 1 },
  { id: 'lateMark', label: 'Late Mark', flex: 1 },
  { id: 'lessWorkTime', label: 'Less Work Time', flex: 1 },
  { id: 'halfDay', label: 'Half Day', flex: 1 },
  { id: 'total', label: 'Total', flex: 1 },
];

const initialRows = [
  { id: 1, name: "Prajwal", basic: 10000, hra: 5000, da: 5000, specialAllowances: 0, bonus: 0, providentFund: 0, lateMark: 10, lessWorkTime: 100, halfDay: 500 },
  { id: 2, name: "Arun", basic: 50000, hra: 20000, da: 5000, specialAllowances: 0, bonus: 0, providentFund: 0, lateMark: 10, lessWorkTime: 100, halfDay: 500 },
];

export default function ReleaseSalaryForm() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [editableRows, setEditableRows] = useState(initialRows); // State to hold editable row data

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (id) => {
    // Find the row by id and toggle its editable state
    const updatedRows = editableRows.map(row =>
      row.id === id ? { ...row, editable: !row.editable } : row
    );
    setEditableRows(updatedRows);
  };

  const handleCellChange = (e, id, columnId) => {
    // Update the cell value in the editableRows state
    const updatedRows = editableRows.map(row =>
      row.id === id ? { ...row, [columnId]: e.target.value } : row
    );
    setEditableRows(updatedRows);
  };

  const salarySchema = Yup.object({
    payMonth: Yup.date().required("Payment of which month is required"),
  });

  const formik = useFormik({
    initialValues: {
      payMonth: dayjs(`${selectedYear}-${selectedMonth}-01`),
    },
    validationSchema: salarySchema,
    onSubmit: async (values) => {
      try {
        const month = values.payMonth.$M + 1;
        const year = values.payMonth.$y;

        const startOfMonth = dayjs(`${year}-${month}-01`)
          .startOf("month")
          .format("YYYY-MM-DD");
        const endOfMonth = dayjs(`${year}-${month}-01`)
          .endOf("month")
          .format("YYYY-MM-DD");

        const response = await axiosInstance.post("/v1/payroll", {
          startOfMonth,
          endOfMonth,
        });

        if (response.status === 200) {
          Toast.success("Payment released successfully");
        } else {
          throw new Error("Unexpected status code received");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        Toast.error(errorMessage);
      }
    },
  });

  return (
    <>
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Box
          component="form"
          noValidate
          sx={{ p: 2 }}
          onSubmit={formik.handleSubmit}
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Month"}
                openTo="month"
                views={["year", "month"]}
                value={formik.values.payMonth}
                onChange={(newValue) => {
                  setSelectedMonth(newValue.month() + 1);
                  setSelectedYear(newValue.year());
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ width: "100%", p: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                </TableCell>
                <TableCell align="center" colSpan={5}>
                  Earning
                </TableCell>
                <TableCell align="center" colSpan={5}>
                  Deduction
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editableRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, name, basic, hra, da, specialAllowances, bonus, providentFund, lateMark, lessWorkTime, halfDay } = row;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        {basic}
                      </TableCell>
                      <TableCell>
                        {hra}
                      </TableCell>
                      <TableCell>
                        {da}
                      </TableCell>
                      <TableCell>
                        {row.editable ? (
                          <input
                            style={{ width: "80px" }}
                            type="number"
                            value={specialAllowances}
                            onChange={(e) => handleCellChange(e, id, 'specialAllowances')}
                          />
                        ) : (
                          specialAllowances
                        )}
                      </TableCell>
                      <TableCell>
                        {row.editable ? (
                          <input
                            style={{ width: "80px" }}
                            type="number"
                            value={bonus}
                            onChange={(e) => handleCellChange(e, id, 'bonus')}
                          />
                        ) : (
                          bonus
                        )}
                      </TableCell>
                      <TableCell>{providentFund}</TableCell>
                      <TableCell>{lateMark}</TableCell>
                      <TableCell>{lessWorkTime}</TableCell>
                      <TableCell>{halfDay}</TableCell>
                      <TableCell>{(basic + hra + da + specialAllowances + bonus) - (providentFund + lateMark + lessWorkTime + halfDay)}</TableCell>
                      <TableCell>
                        <Button
                          size={"small"}
                          onClick={() => handleEditClick(row.id)}
                        >
                          {row.editable ? <SaveIcon /> : <EditIcon />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={editableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button
          sx={{ padding: "13px 15px" }}
          variant="contained"
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
        >
          Release Salary of Selected Month
        </Button>
      </Paper>
    </>
  );
}

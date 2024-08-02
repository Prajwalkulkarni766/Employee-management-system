import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useRef } from 'react';

/*
TODO: add functionality to download pdf

*/

function generatePdf() {
}

function createData(
    name = string,
    calories = number,
    fat = number,
    carbs = number,
    protein = number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];


export default function SalaryUI() {
    const tableRef = useRef(null);

    return (
        <Paper elevation={0} sx={{ width: "100%", p: 5 }}>
            <TableContainer id="payslip-table" ref={tableRef}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Earnings</TableCell>
                            <TableCell colSpan={2}>Deductions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Basic</TableCell>
                            <TableCell>1000</TableCell>
                            <TableCell>Provident Fund</TableCell>
                            <TableCell>Provident Fund</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>HRA</TableCell>
                            <TableCell>HRA</TableCell>
                            <TableCell>Profession Tax</TableCell>
                            <TableCell>Profession Tax</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>DA</TableCell>
                            <TableCell>DA</TableCell>
                            <TableCell>ESI</TableCell>
                            <TableCell>ESI</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Special Allowance</TableCell>
                            <TableCell>Special Allowance</TableCell>
                            <TableCell>Home Loan</TableCell>
                            <TableCell>Home Loan</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bonus</TableCell>
                            <TableCell>Bonus</TableCell>
                            <TableCell>TDS</TableCell>
                            <TableCell>TDS</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Earnings</TableCell>
                            <TableCell>Total Earnings</TableCell>
                            <TableCell>Total Deductions</TableCell>
                            <TableCell>Total Deductions</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Typography sx={{ mt: 5 }}>Net Pay: 1000</Typography>
            </TableContainer>


            <button onClick={generatePdf}>Download Payslip as PDF</button>
        </Paper>
    )
}
import { useState, useEffect } from 'react';
import PageHeading from "../../../../components/PageHeading";
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';

export default function EmployeeTodayAttendance() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        setIsCheckedIn(true);
    };

    const handleCheckOut = () => {
        setIsCheckedOut(true);
    };

    return (
        <>
            <PageHeading pageName={"Today's Attendance"} />
            <Paper elevation={3} sx={{ p: 2, width: "100%", textAlign: "center" }}>
                <Typography variant="h2" sx={{ mb: 5 }}>
                    {currentTime.toLocaleTimeString()}
                </Typography>
                {!isCheckedIn && (
                    <Button onClick={handleCheckIn} variant="contained" >Check In</Button>
                )}
                {!isCheckedOut && isCheckedIn && (
                    <Button onClick={handleCheckOut} variant="contained" >Check Out</Button>
                )}
                <div style={{ width: "100%", marginTop: "5vh" }}>
                    <Typography>Check In : { }</Typography>
                    <Typography>Check Out : { }</Typography>
                </div>
            </Paper>
        </>
    );
}

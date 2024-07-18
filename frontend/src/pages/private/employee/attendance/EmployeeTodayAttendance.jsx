import { useState, useEffect } from "react";
import PageHeading from "../../../../components/PageHeading";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import axiosInstance from "../../../../axios/axiosInstance";
import dayjs from "dayjs";

export default function EmployeeTodayAttendance() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const getCheckInAndCheckOutData = async () => {
    const date = dayjs().format("YYYY-MM-DD");
    const response = await axiosInstance.get(`/v1/attendance?date=${date}`);

    if (response.status === 200) {
      if (response.data.data.checkIn) {
        setIsCheckedIn(true);
        setCheckInTime(response.data.data.checkIn);
      }
      if (response.data.data.checkOut) {
        setIsCheckedOut(true);
        setCheckOutTime(response.data.data.checkOut);
      }
    } else {
      throw new Error("Unexpected status code received");
    }
  };

  const checkIn = async () => {
    try {
      const date = dayjs();
      const body = {
        checkIn: date,
        day: date.format("dddd"),
        date: date.format("YYYY-MM-DD"),
      };

      const response = await axiosInstance.post(`/v1/attendance/checkIn`, body);

      if (response.status === 200 || response.status === 201) {
        setIsCheckedIn(true);
        setCheckInTime(response.data.data.checkIn);
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  const checkOut = async () => {
    try {
      const date = dayjs();
      const body = {
        checkOut: date,
        day: date.format("dddd"),
        date: date.format("YYYY-MM-DD"),
      };

      const response = await axiosInstance.post(
        `/v1/attendance/checkOut`,
        body
      );

      if (response.status === 200 || response.status === 201) {
        setIsCheckedOut(true);
        setCheckOutTime(response.data.data.checkIn);
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    getCheckInAndCheckOutData();
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageHeading pageName={"Today's Attendance"} />
      <Paper elevation={3} sx={{ p: 2, width: "100%", textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 5 }}>
          {currentTime.toLocaleTimeString()}
        </Typography>
        {!isCheckedIn && (
          <Button onClick={checkIn} variant="contained">
            Check In
          </Button>
        )}
        {!isCheckedOut && isCheckedIn && (
          <Button onClick={checkOut} variant="contained">
            Check Out
          </Button>
        )}
        <div style={{ width: "100%", marginTop: "5vh" }}>
          <Typography>
            Check In : {dayjs(checkInTime).format("HH:mm")}
          </Typography>
          <Typography>
            Check Out : {dayjs(checkOutTime).format("HH:mm")}
          </Typography>
        </div>
      </Paper>
    </>
  );
}

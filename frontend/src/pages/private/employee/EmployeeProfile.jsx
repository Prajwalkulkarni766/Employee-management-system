import PageHeading from "../../../components/PageHeading";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EmployeeCard from "../../../components/EmployeeCard";
import {
  Card,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  LinearProgress,
} from "@mui/material";


export default function EmployeeProfile() {
  return (
    <>
      <PageHeading pageName="Employee Profile" />
      <EmployeeCard />
    </>
  );
}

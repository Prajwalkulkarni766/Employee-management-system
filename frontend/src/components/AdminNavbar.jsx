import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FeedIcon from "@mui/icons-material/Feed";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuItem from "./MenuItem";
import NavBar from "./NavBar";

// nav bar menu list
const ListItemsWithTextAndIcon = () => {
  return (
    <React.Fragment>
      <MenuItem menuTitle="Dashboard" icon={DashboardIcon} menuItems={[]} />

      <MenuItem
        menuTitle="Employees"
        icon={PeopleIcon}
        menuItems={["All Employee", "Add Employee"]}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={["All Leave"]}
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={["All Holiday", "Add Holiday"]}
      />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={["Employee Attendence"]}
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={["Employee Salary", "Release Salary"]}
      />
    </React.Fragment>
  );
};

const ListItemWithLogoOnly = () => {
  return (
    <React.Fragment>
      <MenuItem menuTitle="Dashboard" icon={DashboardIcon} menuItems={[]} />

      <MenuItem menuTitle="Employees" icon={PeopleIcon} menuItems={[]} />

      <MenuItem menuTitle="Leave Management" icon={FeedIcon} menuItems={[]} />

      <MenuItem menuTitle="Holiday" icon={FlightTakeoffIcon} menuItems={[]} />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={[]}
      />

      <MenuItem menuTitle="Payroll" icon={PaymentsIcon} menuItems={[]} />
    </React.Fragment>
  );
};

export default function AdminNavbar({ component }) {
  return (
    <NavBar
      component={component}
      ListItemsWithTextAndIcon={ListItemsWithTextAndIcon}
      ListItemWithLogoOnly={ListItemWithLogoOnly}
    />
  );
}

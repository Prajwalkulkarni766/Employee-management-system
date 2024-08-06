import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FeedIcon from "@mui/icons-material/Feed";
import PaymentsIcon from "@mui/icons-material/Payments";
import TuneIcon from "@mui/icons-material/Tune";
import MenuItem from "./MenuItem";
import NavBar from "./NavBar";

// nav bar menu list
const ListItemsWithTextAndIcon = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuOpen = (index) => {
    if (openMenu === index) {
      setOpenMenu(null);
    } else {
      setOpenMenu(index);
    }
  };
  return (
    <React.Fragment>
      <MenuItem menuTitle="Dashboard" icon={DashboardIcon} menuItems={["Dashboard"]}
        isOpen={openMenu === 1}
        onMenuOpen={() => handleMenuOpen(1)}
      />

      <MenuItem
        menuTitle="Employees"
        icon={PeopleIcon}
        menuItems={["All Employee", "Add Employee"]}
        isOpen={openMenu === 2}
        onMenuOpen={() => handleMenuOpen(2)}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={["All Leave"]}
        isOpen={openMenu === 3}
        onMenuOpen={() => handleMenuOpen(3)}
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={["All Holiday", "Add Holiday"]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
      />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={["Employee Attendence"]}
        isOpen={openMenu === 5}
        onMenuOpen={() => handleMenuOpen(5)}
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={["Employee Salary", "Release Salary"]}
        isOpen={openMenu === 6}
        onMenuOpen={() => handleMenuOpen(6)}
      />

      <MenuItem menuTitle="Configuration" icon={TuneIcon} menuItems={["Configuration"]} />
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

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={[]}
      />

      <MenuItem menuTitle="Configuration" icon={TuneIcon} menuItems={[]} />
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

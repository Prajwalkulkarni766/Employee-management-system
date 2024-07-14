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
      <MenuItem
        menuTitle="Dashboard"
        icon={DashboardIcon}
        menuItems={[]}
        isOpen={openMenu === 0}
        onMenuOpen={() => handleMenuOpen(0)}
      />

<MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={["Today's Attendence", "Attendence Sheet"]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={["All Leave", "Leave Balance"]}
        isOpen={openMenu === 2}
        onMenuOpen={() => handleMenuOpen(2)}
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={["All Holiday"]}
        isOpen={openMenu === 3}
        onMenuOpen={() => handleMenuOpen(3)}
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={["Employee Salary"]}
        isOpen={openMenu === 5}
        onMenuOpen={() => handleMenuOpen(5)}
      />
    </React.Fragment>
  );
};

const ListItemWithLogoOnly = () => {
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
      <MenuItem
        menuTitle="Dashboard"
        icon={DashboardIcon}
        menuItems={[]}
        isOpen={openMenu === 0}
        onMenuOpen={() => handleMenuOpen(0)}
        role="admn"
      />

      <MenuItem
        menuTitle="Employees"
        icon={PeopleIcon}
        menuItems={[]}
        isOpen={openMenu === 1}
        onMenuOpen={() => handleMenuOpen(1)}
        role="admn"
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={[]}
        isOpen={openMenu === 2}
        onMenuOpen={() => handleMenuOpen(2)}
        role="admn"
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={[]}
        isOpen={openMenu === 3}
        onMenuOpen={() => handleMenuOpen(3)}
        role="admn"
      />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={[]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
        role="admn"
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={[]}
        isOpen={openMenu === 5}
        onMenuOpen={() => handleMenuOpen(5)}
        role="admn"
      />
    </React.Fragment>
  );
};

export default function EmployeeNavBar({ component }) {
  return (
    <NavBar
      component={component}
      ListItemsWithTextAndIcon={ListItemsWithTextAndIcon}
      ListItemWithLogoOnly={ListItemWithLogoOnly}
    />
  );
}

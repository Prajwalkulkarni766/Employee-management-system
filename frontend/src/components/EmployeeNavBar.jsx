import React, { useState } from "react";
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
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={["Today's Attendence", "Attendence Sheet"]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={["All Leave", "Apply For Leave"]}
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
  return (
    <React.Fragment>
      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={[]}
        role="admn"
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={[]}
        role="admn"
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={[]}
        role="admn"
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={[]}
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

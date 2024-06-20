import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FeedIcon from "@mui/icons-material/Feed";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuItem from "./MenuItem";

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
        menuTitle="Employees"
        icon={PeopleIcon}
        menuItems={[
          "All Employee",
          "Add Employee",
          "Edit Employee",
          "Employee Profile",
        ]}
        isOpen={openMenu === 1}
        onMenuOpen={() => handleMenuOpen(1)}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={["All Leave", "Leave Balance", "Leave type"]}
        isOpen={openMenu === 2}
        onMenuOpen={() => handleMenuOpen(2)}
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={["All Holiday", "Add Holiday", "Edit Holiday"]}
        isOpen={openMenu === 3}
        onMenuOpen={() => handleMenuOpen(3)}
      />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={[
          "Today's Attendence",
          "Employee Attendence",
          "Attendence Sheet",
        ]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={["Employee Salary", "Payslip"]}
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
      />

      <MenuItem
        menuTitle="Employees"
        icon={PeopleIcon}
        menuItems={[]}
        isOpen={openMenu === 1}
        onMenuOpen={() => handleMenuOpen(1)}
      />

      <MenuItem
        menuTitle="Leave Management"
        icon={FeedIcon}
        menuItems={[]}
        isOpen={openMenu === 2}
        onMenuOpen={() => handleMenuOpen(2)}
      />

      <MenuItem
        menuTitle="Holiday"
        icon={FlightTakeoffIcon}
        menuItems={[]}
        isOpen={openMenu === 3}
        onMenuOpen={() => handleMenuOpen(3)}
      />

      <MenuItem
        menuTitle="Attendence"
        icon={DriveFileRenameOutlineIcon}
        menuItems={[]}
        isOpen={openMenu === 4}
        onMenuOpen={() => handleMenuOpen(4)}
      />

      <MenuItem
        menuTitle="Payroll"
        icon={PaymentsIcon}
        menuItems={[]}
        isOpen={openMenu === 5}
        onMenuOpen={() => handleMenuOpen(5)}
      />
    </React.Fragment>
  );
};

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "white",
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Navbar({ component: Component }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="black"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Employee Management System
            </Typography>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {open && (
              <IconButton hidden={!open} onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          <List component="nav">
            {open ? <ListItemsWithTextAndIcon /> : <ListItemWithLogoOnly />}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
            <Grid container>
              <Component />
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

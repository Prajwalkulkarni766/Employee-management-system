import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ menuTitle, icon: Icon, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current location

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const showExpandMore = menuItems.length > 0;
  const path = `/admin/${menuTitle
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/'/g, "")}`;

  const isActive = location.pathname.startsWith(path); // Check if path matches

  return (
    <>
      <Tooltip title={menuTitle} placement="right">
        {!showExpandMore ? (
          <NavLink
            to={path}
            style={{
              textDecoration: "none",
              // color: isActive ? "red" : "inherit",
            }}
          >
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={menuTitle} />
              {showExpandMore && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </NavLink>
        ) : (
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={menuTitle} />
            {showExpandMore && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        )}
      </Tooltip>

      {showExpandMore && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuItems.map((item, index) => (
              <NavLink
                to={`${path}/${item
                  .toLowerCase()
                  .replace(/ /g, "")
                  .replace(/'/g, "")}`}
                key={index}
                style={{
                  textDecoration: "none",
                  // color: "inherit",
                  // color: isActive ? "red" : "inherit",
                }}
              >
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </NavLink>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  zIndex: theme.zIndex.drawer + 1, // Ensure header is below sidebar
  position: "fixed",
  width: `calc(100% - 240px)`, // Adjust based on sidebar width
  marginLeft: 240, // Adjust based on sidebar width
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <StyledAppBar>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {/* Header Content */}
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>

        <IconButton
          edge="end"
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          {user?.name.charAt(0)}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

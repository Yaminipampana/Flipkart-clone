import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2874f0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + Explore */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
            Flipkart
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", color: "#ffe500" }}
          >
            Explore&nbsp;
            <span style={{ fontWeight: "bold", color: "#fff" }}>Plus</span>
          </Typography>
        </Box>

        {/* Middle: Search Bar */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            paddingX: 1,
            width: "40%",
          }}
        >
          <InputBase
            placeholder="Search for products, brands and more"
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Right: Login, Cart, Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#fff", color: "#2874f0" }}
          >
            Login
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccountCircleIcon />
            <Typography variant="body1">Anshul</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ShoppingCartIcon />
            <Typography variant="body1">Cart</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

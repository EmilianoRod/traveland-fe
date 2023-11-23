import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar({ navArrayLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "#005F6B",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <a href="/">
            <img src="/Logo.svg"></img>
          </a>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CADA VIAJE UNA NUEVA EXPERIENCIA
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {localStorage.getItem("email") ? (
              <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                <Typography variant="h6" >
                  Bienvenid@, {localStorage.getItem("email")} !
                </Typography>
                <AccountCircleIcon />
              </div>
            ) : null}
            {navArrayLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component={NavLink}
                to={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer navArrayLinks={navArrayLinks} setOpen={setOpen} />
      </Drawer>
    </>
  );
}

export default Navbar;

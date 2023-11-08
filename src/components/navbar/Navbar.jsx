import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";





function Navbar({navArrayLinks}) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <AppBar 
            position="fixed"
            sx={{
                backgroundColor: "white",
                color: "#005F6B"
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

                    <img src="/Logo.svg"></img>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        CADA VIAJE UNA NUEVA EXPERIENCIA
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {
                            navArrayLinks.map(item => (
                                <Button
                                    color="inherit"
                                    key={item.title}
                                    component={NavLink}
                                    to={item.path}
                                >
                                    {item.title}
                                </Button>
                            ))
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{ display: { xs: "flex", sm: "none" } }}
            >
                <NavListDrawer navArrayLinks={navArrayLinks} setOpen={setOpen}/>
            </Drawer>
        </>
    )
}

export default Navbar;
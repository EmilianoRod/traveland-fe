import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import { BorderColor, Logout } from "@mui/icons-material";
import Product from "./components/Product";
import TravelCard from "./components/TravelCard";
import Navbar from "./components/navbar/Navbar";
import WhatsAppLink from "./components/WhatsAppLink";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HandleLogout from "./pages/HandleLogout";

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import PanelProductos from "./pages/PanelProductos";
import PanelUsuarios from "./pages/PanelUsuarios";
import PanelCategorias from "./pages/PanelCategorias";
import DetalleProducto from "./pages/DetalleProducto";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import UsuarioAdmin from "./pages/UsuarioAdmin";
import PanelCaracteristicas from "./pages/PanelCaracteristicas";
import Reserva from "./pages/Reserva";

export const UserContext = React.createContext();



const navArrayLinks = [
  {
    title: "Inicio",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Iniciar sesion",
    path: "login",
    icon: <DraftsIcon />,
  },
  {
    title: "Crear cuenta",
    path: "register",
    icon: <MenuIcon />,
  },
];
const navLogout = [
  {
    title: "Inicio",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Panel de usuario",
    path: "/usuario",
    icon: <DraftsIcon />,
  },
  {
    title: "Cerrar sesión",
    path: "/logout",
    icon: <Logout />,
  }
]

function App() {
  const [loged, setLoged] = useState(false);

  function getJwt(){
    if(localStorage.getItem("token")){
      setLoged(true);
    }
  }
  useEffect(()=>{
    getJwt();
  },[])

  return (
    <>
      <UserContext.Provider value={[loged, setLoged]}>
        <Navbar navArrayLinks={loged ? navLogout : navArrayLinks} />
        <Container
          maxWidth={false}
          sx={{
            justifyContent: "center",
            mt: 5,
            mr: 0,
            ml: 0,
            paddingBottom: '2rem',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/administracion" element={<Admin />} />
            <Route path="/logout" element={<HandleLogout />} />
            <Route path="/usuario" element={<UsuarioAdmin />} />
            <Route
              path="/administracion/productos"
              element={<PanelProductos />}
            />
            <Route
              path="/administracion/usuarios"
              element={<PanelUsuarios />}
            />
            <Route
              path="/administracion/categorias"
              element={<PanelCategorias />}
            />
            <Route
              path="/administracion/caracteristicas"
              element={<PanelCaracteristicas />}
            />
            <Route path="/detalleproducto/:id" element={<DetalleProducto />} />
            <Route path="/reserva/:id" element={<Reserva />} />
          </Routes>
        </Container>
        <Footer />
        <WhatsAppLink />
      </UserContext.Provider>
    </>
  );
}

export default App;

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

function Admin() {
 const [rol, setRol] = useState();

 function getRol(){
   if(localStorage.getItem("role") === "ADMIN"){
     setRol(true);
   }
 }
 useEffect(() => {
   getRol();
 }, []);
 

  return (
    <>
    {rol == "ADMIN" ? (
      <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginBottom: "auto",
        marginTop: "7rem",
      }}
    >
      <Typography variant="h2">Administracion</Typography>
      <Button
        sx={{
          fontSize: "1.5rem",
          border: 2,
          borderRadius: 2,
          margin: "1rem 1rem 1rem 0",
          padding: "1rem",
          width: "100%"
        }}
        href="/administracion/usuarios"
      >
        PANEL DE USUARIOS
      </Button>
      <Button
        sx={{
          fontSize: "1.5rem",
          border: 2,
          borderRadius: 2,
          margin: "1rem 1rem 1rem 0",
          padding: "1rem",
          width: "100%"
        }}
        href="/administracion/productos"  
      
      >
        PANEL DE PRODUCTOS
      </Button>
      <Button
        sx={{
          fontSize: "1.5rem",
          border: 2,
          borderRadius: 2,
          margin: "1rem 1rem 1rem 0",
          padding: "1rem",
          width: "100%"
        }}
        href="/administracion/categorias"  
      
      >
        PANEL DE CATEGORIAS
      </Button>
    </Box>
    ) : (
      <Box>
        <Typography sx={{ textAlign: "center", marginTop: "10rem" }} variant="h2">No tienes permisos para acceder.</Typography>
      </Box>
    )}
    </>
  );
}

export default Admin;

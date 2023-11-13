import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

function Admin() {
 

  return (
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
  );
}

export default Admin;

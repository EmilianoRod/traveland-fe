import { Box, Button, Stack, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function PanelUsuarios() {
    const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
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
      <Button href="/administracion">Volver al Menú de Administracion</Button>
      <Typography variant="h2">Panel de Usuarios</Typography>
      </Box>
      
    );
}

export default PanelUsuarios;
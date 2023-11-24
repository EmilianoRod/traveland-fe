import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useEffect, useState } from "react";
import Favoritos from "../components/Favoritos";

function UsuarioAdmin() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [render, setRender] = useState(false);

  // Se realiza el fetch para traer los datos del usuario si existe en el localStorage
  function handleFetch() {
    setLoading(true);
    fetch("http://107.20.56.84/api/usuario/" + localStorage.getItem("id"), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRender(true);
        console.log(data);
        setData(data);
      });
  }

  // Se valida que exista un token, si este no existe se muestra un mensaje que debe iniciar sesión para ver el panel y se redirecciona a la pagina de login
  if (!localStorage.getItem("token")) {
    setTimeout(() => {
      window.location.replace("/login");
    }, 2500);
    return (
      <Typography variant="h3" sx={{ mt: 25, mb: 15, textAlign: "center" }}>
        Debe iniciar sesión
      </Typography>
    );
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Grid sx={{ mt: 25 }}>
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
        <Typography variant="h2">Panel de Usuario</Typography>
      </Box>
      {loading ? (
        <CircularProgress
          sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          size={50}
        />
      ) : null}
      {render ? (
        <Box>
        <Typography variant="h3">
          Bienvenid@, {data.nombre} {data.apellido}
        </Typography>
        <Box sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
            Tus datos:
          </Typography>
          <Typography variant="h5">Telefono: {data.telefono}</Typography>
          <Typography variant="h5">Email: {data.email}</Typography>
        </Box>
        <Box sx={{ mt: 5, mb: 5 }}>
          <Favoritos />
        </Box>
      </Box>
      ): null}
      
    </Grid>
  );
}

export default UsuarioAdmin;

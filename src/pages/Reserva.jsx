import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reserva() {
  const [usuario, setUsuario] = useState();
  const [producto, setProducto] = useState();
  const [imagenes, setImagenes] = useState();
  const [cantidadPersonas, setCantidadPersonas] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://107.20.56.84/api/usuario/${localStorage.getItem("id")}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsuario(data);
        console.log(data);
      });
    fetch(`http://107.20.56.84/api/producto/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
        console.log(data);
      });
    fetch("http://107.20.56.84/api/producto/traerImagenes/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImagenes(data);
      });
  }, []);

  function handleReserva(e) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      usuario: {
        id: localStorage.getItem("id"),
      },
      producto: {
        id: id,
      },
      numeroPersonas: cantidadPersonas,
    };
    fetch("http://107.20.56.84/api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setSuccess("Reserva realizada con éxito");
        setTimeout(() => {
            window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error al realizar la reserva");
      });
  }
  return (
    <Box sx={{ marginTop: 15, height: "auto" }}>
      <Typography variant="h2">Reserva</Typography>
      <form style={{ marginBottom: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 5,
          }}
        >
          <Typography variant="h4">Información de producto</Typography>
          <Typography variant="h6">{producto?.nombre}</Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {" "}
            CUPOS DISPONIBLES: {producto?.cupos}
          </Typography>
          <Typography variant="body1">{producto?.descripcion}</Typography>
          <Grid container>
            <Grid item xs={4}>
              {imagenes?.map((imagen) => (
                <img
                  key={imagen}
                  src={imagen}
                  alt={imagen.imagen}
                  width={"100%"}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 5,
          }}
        >
          <Typography variant="h4">Información de usuario</Typography>
          <Typography variant="body1">Nombre: {usuario?.nombre}</Typography>
          <Typography variant="body1">Apellido: {usuario?.apellido}</Typography>
          <Typography variant="body1">Email: {usuario?.email}</Typography>
          <Typography variant="body1">Teléfono: {usuario?.telefono}</Typography>
          <TextField
            label="Numero de personas"
            type={"number"}
            sx={{ width: 300 }}
            onChange={(e) => setCantidadPersonas(e.target.value)}
          />
          <Typography variant="body2">
            Máx. disponible: {producto?.cupos} personas
          </Typography>
        </Box>

        <Button variant="contained" color="primary" onClick={handleReserva}>
          CONFIRMAR RESERVA
        </Button>
      </form>
      {loading ? (
        <CircularProgress
          sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          size={50}
        />
      ) : null}
      {success ? (
        <Typography variant="body1" sx={{ color: "green", margin: "2rem 0" }}>
          {success}
        </Typography>
      ) : null}
      {error ? (
        <Typography variant="body1" sx={{ color: "red" }}>
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}

export default Reserva;

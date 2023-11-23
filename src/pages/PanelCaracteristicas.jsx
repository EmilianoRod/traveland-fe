import { Sd, Update } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function PanelCaracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function fetchData() {
    fetch("http://107.20.56.84/api/caracteristica", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCaracteristicas(data);
        setLoading(false);
      });
  }
  function handleNuevaCaracteristica(e) {
    e.preventDefault();
    const caracteristica = {
      nombre: nuevaCaracteristica
    };
    setLoading(true);
    fetch("http://107.20.56.84/api/caracteristica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caracteristica),
    }).then((response) => {
      response
        .json()
        .then((data) => {
            console.error(error);
            setLoading(false);
            setError("Error al crear la caracteristica");
            setTimeout(() => {
              setError("");
            }, 5000);
        })
        .catch((error) => {
            setCaracteristicas([...caracteristicas, caracteristica]);
          setLoading(false);
          setSuccess(`Categoria ${nuevaCaracteristica} creada exitosamente`);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
          setNuevaCaracteristica("");
          console.log(data)
          
        });
    });
  }

  function handleDelete(id, nombre) {
    const check = window.confirm(
      `¿Seguro que quieres eliminar la caracteristica ${nombre}?`
    );
    if (check) {
      setLoading(true);
      fetch("http://107.20.56.84/api/caracteristica/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          setCaracteristicas([
            ...caracteristicas.filter((card) => card.id !== id),
          ]);
          setLoading(false);
          setSuccess(`Caracteristica ${nombre} eliminada exitosamente`);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError("Error al eliminar la caracteristica " + nombre);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
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
      <Typography variant="h2">CARACTERISTICAS</Typography>

      <Typography>Agregar una nueva caracteristica</Typography>
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="categoria"
        type={"text"}
        value={nuevaCaracteristica}
        onChange={(e) => setNuevaCaracteristica(e.target.value)}
        label="Nombre de la caracteristica"
        variant="outlined"
      />
      <Button
        onClick={handleNuevaCaracteristica}
        sx={{ backgroundColor: "green", color: "white" }}
      >
        AGREGAR CARACTERISTICA
      </Button>
      <Typography sx={{ mt: 2, mb: 2, color: "red", fontWeight: "bold" }}>
        Haz click en una caracteristica para eliminarla
      </Typography>
      {loading ? (
        <CircularProgress
          sx={{
            marginTop: 10,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          size={100}
        />
      ) : null}
      {success ? (
        <Typography
          sx={{
            backgroundColor: "green",
            color: "white",
            width: "100%",
            textAlign: "center",
            fontSize: "1.5rem",
            mt: 2,
            mb: 2,
          }}
        >
          {success}
        </Typography>
      ) : null}
      {error ? (
        <Typography
          sx={{
            backgroundColor: "red",
            color: "white",
            width: "100%",
            textAlign: "center",
            fontSize: "1.5rem",
            mt: 2,
            mb: 2,
          }}
        >
          {error}
        </Typography>
      ) : null}
      {caracteristicas.map((caracteristica) => (
        <Typography
          onClick={() => handleDelete(caracteristica.id, caracteristica.nombre)}
          sx={[
            {
              "&:hover": {
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              },
              width: "100%",
              mt: 2,
              fontSize: "1.5rem",
              fontWeight: "bold",
              border: 2,
              borderRadius: 2,
              textAlign: "center",
            },
          ]}
          key={caracteristica.id}
        >
          {caracteristica.nombre}
        </Typography>
      ))}
    </Box>
  );
}

export default PanelCaracteristicas;

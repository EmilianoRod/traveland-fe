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

function PanelCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

    // Se realiza el fetch para traer todas las categorias
  function fetchData() {
    fetch("http://107.20.56.84/api/categoria", { method: "GET" })
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategorias(data);
        setLoading(false);
      });
  }
  // Se arma el objeto para enviar al backend y crear una nueva categoria

  function handleNuevaCategoria(e) {
    e.preventDefault();
    const categoria = {
      nombre: nuevaCategoria
    };
    setLoading(true);
    // Se realiza el fetch para crear una nueva categoria

    fetch("http://107.20.56.84/api/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoria)
    })
      .then((response) => response.json())
      .then((data) => {
        console.error(error);
        setLoading(false);
        setError("Error al crear la categoria");
        setTimeout(() => {
          setError("");
        }, 5000);
      })
      .catch((error) => {
        
        setCategorias([...categorias, categoria]);
        setLoading(false);
        setSuccess(`Categoria ${nuevaCategoria} creada exitosamente`);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setNuevaCategoria("");
      });
  }
  // Se realiza consulta y se realiza el fetch para borrar una categoria

  function handleDelete(id, nombre) {
    const check = window.confirm(
      `¿Seguro que quieres eliminar la categoria ${nombre}?`
    );
    if (check) {
      setLoading(true);
      fetch("http://107.20.56.84/api/categoria/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          setCategorias([...categorias.filter((card) => card.id !== id)]);
          setLoading(false);
          setSuccess(`Categoria ${nombre} eliminada exitosamente`);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError("Error al eliminar la categoria " + nombre);
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
      <Typography variant="h2">CATEGORIAS</Typography>

      <Typography>Agregar una nueva categoria</Typography>
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="categoria"
        type={"text"}
        value={nuevaCategoria}
        onChange={(e) => setNuevaCategoria(e.target.value)}
        label="Nombre de la categoria"
        variant="outlined"
      />
      <Button
        onClick={handleNuevaCategoria}
        sx={{ backgroundColor: "green", color: "white" }}
      >
        AGREGAR CATEGORIA
      </Button>
      <Typography sx={{ mt: 2, mb: 2, color: "red", fontWeight: "bold" }}>
        Haz click en una categoria para eliminarla
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
      {categorias.map((categoria) => (
        <Typography
          onClick={() => handleDelete(categoria.id, categoria.nombre)}
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
          key={categoria.id}
        >
          {categoria.nombre}
        </Typography>
      ))}
    </Box>
  );
}

export default PanelCategorias;

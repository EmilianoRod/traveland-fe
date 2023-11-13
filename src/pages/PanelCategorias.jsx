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
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import NewProduct from "../components/NewProduct";
import TravelCardAdmin from "../components/TravelCardAdmin";
import UpdateProduct from "../components/UpdateProduct";

function PanelCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState();


  function fetchData() {
    fetch("http://localhost:8081/api/categoria", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategorias(data);
      });
  }
  function handleNuevaCategoria(e){
    e.preventDefault()
    const categoria = {
      nombre: nuevaCategoria
    }
    fetch("http://localhost:8081/api/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    }).then((response) => {
      response.json().then((data) => {
        setCategorias([...categorias, categoria]);
        
      });
    })
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
          onChange={(e) => setNuevaCategoria(e.target.value)}
          label="Nombre de la categoria"
          variant="outlined"
        />
        <Button onClick={handleNuevaCategoria} sx={{backgroundColor: "green", color: "white"}}>AGREGAR CATEGORIA</Button>

      {categorias.map((categoria) => (
        <Typography sx={{ width: "100%", mt: 2, fontSize: "1.5rem", fontWeight: "bold", border: 2 , borderRadius: 2, textAlign: "center" }} key={categoria.id}>{categoria.nombre}</Typography>
      ))}
    </Box>
  );
}

export default PanelCategorias;

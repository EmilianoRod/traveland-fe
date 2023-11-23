import { SendToMobileRounded } from "@mui/icons-material";
import { Box, Button, TextField, Autocomplete, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import opcionesCategorias from "../assets/categorias";
function NewProduct({ addProduct, categoriasApi }) {
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [categoria, setCategoria] = useState([]);
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechafinal] = useState();
  const [imagenes, setImagenes] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      categorias: categoria,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal
    }
    const producto = new FormData();
    producto.append("productInfo",new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));
    producto.append("files", new Blob(imagenes, {
      type: "multipart/form-data"
    }));
    console.log(producto.getAll("productInfo"));
    fetch("http://localhost:8080/api/producto", {
      method: "POST",
      body: producto,

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setLoading(false)
      setSuccess("Producto creado exitosamente")
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    })
  }
  useEffect(() => {
    renderCategorias();
  }, []);
  function renderCategorias() {
    const list = document.querySelector("#product_category");
    categoriasApi.forEach((category) => {
      list.innerHTML += `<option key="${category.id}" value="${category.id}">${category.nombre}</option>`;
    });
  }

  function manejarImagenes(e) {
    const files = e.target.files;
    setImagenes(files);
  }

  function handleCategoria(){
    const categoriaSelec = categoriasApi.filter((categoria) => categoria.id == document.querySelector("#product_category").value)
    setCategoria([
      ...categoria,
      {
        id: categoriaSelec[0].id,
        nombre: categoriaSelec[0].nombre
      }]
    )
    console.log(categoria)
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginBottom: "auto",
      }}
    >
      <Box>
        <TextField
          sx={{ margin: "1rem 0", width: "100%" }}
          id="nombre"
          type={"text"}
          onChange={(e) => setNombre(e.target.value)}
          label="Nombre"
          variant="outlined"
        />
        <TextField
          sx={{ margin: "1rem 0", width: "100%" }}
          id="descripcion"
          type={"text"}
          onChange={(e) => setDescripcion(e.target.value)}
          label="Descripcion"
          variant="outlined"
        />
        <label htmlFor="fechaInicio">Fecha de inicio:</label>
        <input id="fechaInicio" style={{ margin: "1rem 0", width: "50%", display: "block", padding: "1rem" }} type={"date"} onChange={(e) => setFechaInicio(`${e.target.value}T00:00`)}></input>
        <label htmlFor="fechaFinal">Fecha final:</label>
        <input id="fechaFinal" style={{ margin: "1rem 0", width: "50%", display: "block", padding: "1rem" }} type={"date"} onChange={(e) => setFechafinal(`${e.target.value}T00:00`)}></input>
        <form>
            <select
              id="product_category"
              style={{ margin: "1rem 0", width: "50%", padding: "1rem" }}
              defaultValue="Selecciona la categoria"
              
            ></select>
            <Button onClick={()=>{handleCategoria()}}>+</Button>
          {categoria.map((category) => {
            return <p style={{display: "inline", backgroundColor: "green", padding: "1rem",margin: "0.25rem", color: "white"}} key={category.id}>{category.nombre}</p>;
          })}
            
          </form>
        <label htmlFor="file" style={{ margin: "1rem 0", width: "100%" }}>Imagenes</label>
        <input type={"file"} style={{ margin: "1rem 0", width: "100%" }} onChange={(e) => manejarImagenes(e)} multiple></input>
        <Button
          onClick={handleSubmit}
          sx={{
            display: "block",
            fontSize: "1.5rem",
            border: 2,
            borderRadius: 2,
          }}
        >
          Agregar
        </Button>
        {loading ? (
        <CircularProgress
          sx={{ display: "block", margin: "auto" }}
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
      </Box>
    </Box>
  );
}

export default NewProduct;

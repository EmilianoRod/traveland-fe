import { SendToMobileRounded } from "@mui/icons-material";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import opcionesCategorias from "../assets/categorias";
function NewProduct({ addProduct, categoriasApi }) {
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [categoria, setCategoria] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      categoría: categoria,
    };
    addProduct(producto);
    console.log(producto);
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
        <form>
            <select
              id="product_category"
              style={{ margin: "1rem 0", width: "50%", padding: "1rem" }}
              defaultValue="Selecciona la categoria"
              
            ></select>
            <Button type="submit">+</Button>
          </form>
        <label htmlFor="file" style={{ margin: "1rem 0", width: "100%" }}>Imagen</label>
        <input type={"file"} style={{ margin: "1rem 0", width: "100%" }}></input>
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
      </Box>
    </Box>
  );
}

export default NewProduct;

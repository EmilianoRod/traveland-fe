import { SendToMobileRounded } from "@mui/icons-material";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import opcionesCategorias from "../assets/categorias";
function UpdateProduct({ updateProduct }) {
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [categoria, setCategoria] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const producto = updateProduct;
    fetch("http://13.58.107.197/api/producto/" + producto.id, {
      method: "PUT",
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        <Autocomplete
          sx={{ margin: "1rem 0", width: "100%" }}
          disablePortal
          id="categoria"
          onChange={(event, newValue) => setCategoria(newValue)}
          options={opcionesCategorias()}
          renderInput={(params) => <TextField {...params} label="Categoría" />}
        />
        <Button
          onClick={handleSubmit}
          sx={{
            display: "block",
            fontSize: "1.5rem",
            border: 2,
            borderRadius: 2,
          }}
        >
          Modificar
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateProduct;

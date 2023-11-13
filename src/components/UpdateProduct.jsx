import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function UpdateProduct({
  id,
  nombre,
  descripcion,
  categorias,
  imagenes,
  actualizado,
  categoriasApi,
}) {
  const [idProducto, setIdProducto] = useState(id);
  const [nombreProducto, setNombreProducto] = useState(nombre);
  const [descripcionProducto, setDescripcionProducto] = useState(descripcion);
  //   const [categoriaProducto, setCategoriaProducto] = useState();
  const [imagenesProducto, setImagenesProducto] = useState(imagenes);
  const [categoriasProducto, setCategoriaProducto] = useState(categorias);
  const [categoriaSelected, setCategoriaSelected] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      id: idProducto,
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      imagenes: imagenesProducto,
      categorias: categoriasProducto,
    };
    console.log(update);
    actualizado(false);
    /*
        fetch("http://13.58.107.197/api/producto/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update),
        })
        .catch((error) => {
            console.error('Error:', error);
        }) */
  }

  function renderCategorias() {
    const list = document.querySelector("#product_category");
    categoriasApi.forEach((category) => {
      list.innerHTML += `<option key="${category.id}" value="${category.id}">${category.nombre}</option>`;
    });
  }
  useEffect(() => {
    renderCategorias();
    console.log(categoriasProducto);
  }, []);

  function addCategoryToProduct(e) {
    e.preventDefault();
    const category = document.getElementById("product_category").value;
    if (!categoriasProducto.includes(category)) {
      setCategoriaProducto(...categoriasProducto,{
        id: category.id,
        nombre: category.nombre,
      });
    }
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
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
          label="Nombre"
          variant="outlined"
        />
        <TextField
          sx={{ margin: "1rem 0", width: "100%" }}
          id="descripcion"
          type={"text"}
          value={descripcionProducto}
          onChange={(e) => setDescripcionProducto(e.target.value)}
          label="Descripcion"
          variant="outlined"
        />
        <Box>
          <form onSubmit={addCategoryToProduct}>
            <select
              id="product_category"
              style={{ margin: "1rem 0", width: "50%", padding: "1rem" }}
              defaultValue="Selecciona la categoria"
              onChange={(e) => {
                setCategoriaSelected({
                  id: e.target.value,
                  nombre: e.target.options[e.target.selectedIndex].text,
                });
                console.log(categoriaSelected);
              }}
            ></select>
            <Button type="submit">+</Button>
          </form>

          {categoriasProducto.map((category) => {
            return <Button key={category.id}>{category.nombre}</Button>;
          })}
        </Box>

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

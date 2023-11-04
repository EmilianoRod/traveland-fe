import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import NewProduct from "../components/NewProduct";
import TravelCardAdmin from "../components/TravelCardAdmin";

function PanelProductos() {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState(false);

  function handleFetch() {
    fetch("http://13.58.107.197/api/producto", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.map((card) => {
            return {
              id: card.id,
              nombre: card.nombre,
              descripcion: card.descripcion,
              imagenes: card.imagenes,
            };
          })
        );
      });
  }
  useEffect(() => {
    handleFetch();
  }, [data]);

  function handleDelete(id) {
    fetch("http://13.58.107.197/api/producto/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setData(data.filter((card) => card.id !== id));
  }

  function handleUpdate(id) {
    window.scrollTo(0, 0);
    console.log(id)
  }
  function handleNewProduct() {
    setNewProduct(!newProduct);
  }

  function addNewProduct(producto) {
    fetch("http://13.58.107.197/api/producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setData([...data, producto]);
  }
  

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
      <Typography variant="h2">Panel de Productos</Typography>
      <Button
        onClick={handleNewProduct}
        sx={{
          fontSize: "1.5rem",
          border: 2,
          borderRadius: 2,
          margin: "1rem 1rem 1rem 0",
        }}
      >
        AGREGAR PRODUCTO
      </Button>
      {newProduct ? <NewProduct addProduct={addNewProduct} /> : null}
      <Box
        sx={{
          border: 2,
          padding: 2,
        }}
      >
        <Grid container spacing={8} justifyContent="space-evenly">
          {data.map((card) => {
            return (
              <Grid item key={card.id}>
                <TravelCardAdmin
                  nombre={card.nombre}
                  descripcion={card.descripcion}
                  imagenes={card.imagenes}
                  categoria={card.categoria}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  id={card.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default PanelProductos;

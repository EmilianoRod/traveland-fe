
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import NewProduct from "../components/NewProduct";
import TravelCardAdmin from "../components/TravelCardAdmin";
import UpdateProduct from "../components/UpdateProduct";

function PanelProductos() {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState();
  const [updateForm, setUpdateForm] = useState(false);
  const [categoriasApi, setCategoriasApi] = useState([]);
  const [caracteristicasApi, setCaracteristicasApi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Se realiza el fetch para traer todos los productos
  function handleFetch() {
    fetch("http://107.20.56.84/api/producto", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(
          data.map((card) => {
            return {
              id: card.id,
              nombre: card.nombre,
              descripcion: card.descripcion,
              imagenes: card.imagenes,
              categorias: card.categorias
            };
          })
        );
      });
  }
  useEffect(() => {
    handleFetch();
    getCategorias();
    getCaracteristicas();
  }, []);

  // Se realiza el fetch para eliminar un producto
  function handleDelete(id) {
    fetch("http://107.20.56.84/api/producto/" + id, { method: "DELETE",
    "Authorization": localStorage.getItem("token") })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setData(data.filter((card) => card.id !== id));
  }

  // Se realiza el fetch para actualizar un producto
  function handleUpdate(id) {
    let producto = (data.filter((card) => card.id === id))[0];
    console.log(producto)
    window.scrollTo(0, 0);
    setUpdateForm(!updateForm);
    setUpdateProduct(producto);
  }

  // Cierra el formulario de crear producto
  function handleNewProduct() {
    setNewProduct(!newProduct);
  }

  // Recibe del componente newproduct si se agrego un componente para volver a renderizar los productos
  function addNewProduct(productoAgregado) {
    if(productoAgregado)
    {handleFetch();}
  }

  // Se realiza el fetch para traer las categorias y pasarselas al componente newproduct
  function getCategorias() {
    fetch("http://107.20.56.84/api/categoria", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      setCategoriasApi(data)
    })
  }
  // Se realiza el fetch para traer las caracteristicas y pasarselas al componente newproduct
  function getCaracteristicas(){
    fetch("http://107.20.56.84/api/caracteristica", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      setCaracteristicasApi(data)
    })
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
      {newProduct ? <NewProduct addProduct={addNewProduct} categoriasApi={categoriasApi} caracteristicasApi={caracteristicasApi}/> : null}
      {updateForm ? <UpdateProduct id={updateProduct.id} nombre={updateProduct.nombre} descripcion={updateProduct.descripcion} imagenes={updateProduct.imagenes} categorias={updateProduct.categorias} categoriasApi={categoriasApi} actualizado={(update)=>{setUpdateForm(update); handleFetch()}}/> : null}
      <Box
        sx={{
          border: 2,
          padding: 2,
        }}
      >
        <Grid container spacing={8} justifyContent="space-evenly">
        {loading ? (
              <CircularProgress sx={{ marginTop: 10 }} size={100}/> 
            ):null}
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenesUrl, setImagenesUrl] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);

  useEffect(() => {
    fetch(`http://107.20.56.84/api/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setProducto(data);
      });
    fetch("http://107.20.56.84/api/producto/traerImagenes/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImagenesUrl(data);
      });
    fetch("http://107.20.56.84/api/producto/caracteristica/" + id, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCaracteristicas(data);
    })
  }, [id]);

  if (!producto) {
    return (
      <CircularProgress
        sx={{
          marginTop: 20,
          marginBottom: 5,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        size={100}
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography
        sx={{ textAlign: "center", marginTop: "8rem", fontSize: "2rem" }}
        textAlign="center"
      >
        Fecha de viaje: {producto.fechaInicio.slice(0, 10)} hasta{" "}
        {producto.fechaFinal.slice(0, 10)}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, marginTop: "1rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem", backgroundColor: "#CCC", padding: "5px", borderRadius: "5px"}}>CARACTERISTICAS:</Typography>
        {caracteristicas.map((caracteristica) => (
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem", backgroundColor: "#f5f5f5", padding: "5px", borderRadius: "5px", margin: "0 5px"}} key={caracteristica.id}>{caracteristica.nombre}</Typography>
        ))}
      </Box>
      <Card
        sx={{
          flex: 1,
          display: "flex",
          marginTop: "65px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "85%", objectFit: "cover" }}
          image={
            imagenesUrl.length > 0
              ? imagenesUrl[0]
              : "https://via.placeholder.com/200x200"
          }
          alt="Imagen del producto"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h5" mb={2}>
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {producto.descripcion}
          </Typography>
        </CardContent>
      </Card>
      <Box p={2} mt={2}>
        <Grid container justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Comprar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DetalleProducto;

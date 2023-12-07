import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  CircularProgress,
  TextField,
  Rating,
  Paper
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShareDialog from "../components/ShareDialog";
import Carousel from 'react-material-ui-carousel'


function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenesUrl, setImagenesUrl] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [puntuarProducto, setPuntuarProducto] = useState();
  const [comentarioForm, setComentarioForm] = useState();



  const categoriasImg = ["https://traveland-g5.s3.amazonaws.com/Hospedaje.png", "https://traveland-g5.s3.amazonaws.com/Independiente.png",
                          "https://traveland-g5.s3.amazonaws.com/Guiada.png", "https://traveland-g5.s3.amazonaws.com/accesible.png",
                      ]






  // Se realizan los fetch para traer los datos del producto, las imagenes y las caracteristicas
  useEffect(() => {
    // Obtener el producto
    fetch(`http://107.20.56.84/api/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setProducto(data);
      });
    // Obtener las imagenes
    fetch("http://107.20.56.84/api/producto/traerImagenes/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImagenesUrl(data);
      });
    // Obtener las caracteristicas
    fetch("http://107.20.56.84/api/producto/caracteristica/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCaracteristicas(data);
      });
    fetch("http://107.20.56.84/api/producto/calificaciones/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComentarios(data);
      });
  }, [id]);

  function handlePuntuar(e) {
    e.preventDefault();
    const payload = {
      puntuacion: puntuarProducto,
      comentario: comentarioForm,
      producto: { id: id },
      usuario: localStorage.getItem("email"),
    };
    fetch("http://107.20.56.84/api/producto/calificar", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      });
  }

  // Renderizar el loading mientras se cargan los datos
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
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            backgroundColor: "#CCC",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          CARACTERISTICAS:
        </Typography>
        {caracteristicas.map((caracteristica) => (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              backgroundColor: "#f5f5f5",
              padding: "5px",
              borderRadius: "5px",
              margin: "0 5px",
            }}
            key={caracteristica.id}
          >
            {caracteristica.nombre}
          </Typography>

        ))}

      </Box>
      <Typography sx={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>Cupos disponibles: {producto.cupos}</Typography>
      <Card
        sx={{
          flex: 1,
          display: "flex",
          marginTop: "65px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          flexDirection: {
            xs: 'column',
            sm: 'column',
            lg: 'row',
            xl: 'row'
          },
        }}
      >

        <Carousel
          sx={{width: '100%', height:{xs: '15rem', sm: '20rem', lg: '40rem', xl:'40rem'}}}>
                {
                    imagenesUrl.map( item => <img alt="Imagen del producto" style={{  'max-width': '100%',
                      'height': 'auto'}} key={item} src={item}/> )
                }
            </Carousel>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: 'auto'
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Typography display="flex" alignItems="center" variant="h5">
              Calificación: {producto.puntaje}{" "}
              {<StarIcon sx={{ color: "gold", fontSize: "1.8rem" }} />}
            </Typography>
            <Typography>({comentarios.length} puntuaciones)</Typography>
          </Box>

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
            <Link sx={{ textDecoration: "none" }} to={localStorage.getItem("token") ? `/reserva/${id}` : "/login"}>
              <Button variant="contained" color="primary">
                RESERVAR
              </Button>
            </Link>
            <ShareDialog title={producto.nombre} />
          </Grid>
        </Grid>
      </Box>
      <Box p={2} mt={2}>
        <Box width="100%" p={3} bgcolor="#f0f0f0" borderRadius={10}>
          {/* Políticas de viaje */}
          <Typography variant="h4" textAlign="center" fontWeight='bold' marginBottom={5} gutterBottom>
            Políticas del producto
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                titulo: "Política de Devolución",
                descripcion:
                  "Ofrecemos un plazo de devolución de hasta 30 días antes del inicio del viaje. Para más detalles, consultar nuestros términos y condiciones.",
              },
              {
                titulo: "Seguridad Garantizada",
                descripcion:
                  "Nos comprometemos a brindar un entorno seguro para nuestros viajeros. Contamos con medidas de seguridad y personal capacitado en todos nuestros destinos.",
              },
              {
                titulo: "Política de Reembolso",
                descripcion:
                  "En caso de cancelación por motivos imprevistos, ofrecemos opciones de reembolso parcial o total, sujeto a nuestras políticas de cancelación.",
              },
            ].map((politica, index) => (
              <Grid item xs={12} sm={6} lg={4} marginBottom={5} key={index}>
                <Paper elevation={3} sx={{ borderRadius: 5, padding: 2 }}>
                  <Typography variant="h6" gutterBottom textAlign={"center"}>
                    {politica.titulo}
                  </Typography>
                  <Typography textAlign={"center"}>{politica.descripcion}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "1.5rem", padding: "5px" }}
        >
          Comentarios
        </Typography>
        <form>
          <Rating
            value={puntuarProducto}
            onChange={(event, newValue) => {
              setPuntuarProducto(newValue);
            }}
          ></Rating>
          <TextField
            sx={{ width: "100%", marginBottom: "1rem" }}
            label="Comentario"
            id="comentario"
            type={"text"}
            onChange={(e) => setComentarioForm(e.target.value)}
            multiline
            maxRows={4}
          ></TextField>
          <Button onClick={handlePuntuar} variant="contained" color="primary">
            Agregar comentario
          </Button>
        </form>
        <Grid display={"flex"} flexDirection={"column-reverse"} gap={2}>
          {comentarios.map((comentario) => (
            <Box key={comentario.id} borderBottom="1px solid #ccc" p={2}>
              <Typography></Typography>
              <Typography sx={{ fontSize: "1rem", padding: "1px" }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography>{comentario.usuario}</Typography>
                  <Typography sx={{ color: "gray" }}>
                    {" "}
                    {comentario.fecha.slice(0, 10) +
                      " " +
                      comentario.fecha.slice(11, 19)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography mr={1}>Calificación:</Typography>
                  {comentario.puntuacion} {<StarIcon sx={{ color: "gold" }} />}
                </Box>
                {comentario.comentario}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default DetalleProducto;

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

function TravelCard({ nombre, fechaInicio, fechaFinal, descripcion, id, favoritos, change, puntaje }) {
  const [isFav, setIsFav] = useState();
  const [imagenesUrl, setImagenesUrl] = useState([]);

  //Se realiza el fetch para traer la imagen del producto
  function handleFetch(){
    fetch("http://107.20.56.84/api/producto/traerImagenes/" + id, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setImagenesUrl(data);
    })
  }
  //Se realiza el fetch al iniciar el componente
  useEffect(() => {
    handleFetch();
  },[])



  // Se realiza el fetch para agregar un favorito
  function handleAddFav(id) {
    console.log(id);
    fetch("http://107.20.56.84/api/usuario/addfav/" + localStorage.getItem("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsFav(true);
        change(true)
      }); 
  }


  return (
    <Card
      sx={{
        maxWidth: 200,
        maxHeight: "auto",
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        textDecoration: "none",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={imagenesUrl.length > 0 ? imagenesUrl[0] : "https://via.placeholder.com/200x200"}
          height="200"
          alt="description"
        />
        <CardContent sx={{ textDecoration: "none" }}>
          <Typography variant="h5">{nombre}</Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography display="flex" alignItems="center" variant="h6">
              {puntaje}{" "}
              {<StarIcon sx={{ color: "gold", fontSize: "1.8rem" }} />}
            </Typography>
          </Box>
          <Typography component="p" variant="body2">
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Link sx={{ textDecoration: "none" }} to={`/detalleproducto/${id}`}>
          <Button>VER MÁS..</Button>
        </Link>
        {window.location.pathname === "/" && localStorage.getItem("token") ? <Button onClick={() => handleAddFav(id)}>{isFav ? "ES FAV" : "AGREGAR FAV"}</Button> : null}
       
      </CardActions>
    </Card>
  );
}

export default TravelCard;

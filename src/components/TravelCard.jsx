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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function TravelCard({ nombre, fechaInicio, fechaFinal, descripcion, id, favoritos, change, puntaje }) {
  const [isFav, setIsFav] = useState();
  const [imagenesUrl, setImagenesUrl] = useState([]);

  //Se realiza el fetch para traer la imagen del producto
  function handleFetch() {
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
  }, [])



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
        maxWidth: 300,
        height: '35rem',
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        textDecoration: "none",
        backgroundColor: '#cfd1d4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >

      <Link to={`/detalleproducto/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imagenesUrl.length > 0 ? imagenesUrl[0] : "https://via.placeholder.com/200x200"}
            height="200"
            alt="description"
          />
          <CardContent sx={{ textDecoration: "none" }}>
            <Typography variant="h5">{nombre}</Typography>
            <Box display="flex" alignItems="flex-start" mb={2} flexDirection='column'>
              <Typography display="flex" alignItems="center" variant="h6">
                {puntaje}{" "}
                {<StarIcon sx={{ color: "gold", fontSize: "1.8rem" }} />}
              </Typography>
              <Typography>Desde {fechaInicio.slice(0, 10)} <br/> Hasta {fechaFinal.slice(0,10)}</Typography>
            </Box>
            <Typography component="p" variant="body2">
              {descripcion}
            </Typography>
          </CardContent>
        </CardActionArea>

      </Link>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', }}>
        <Link to={`/detalleproducto/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Button >VER MÁS..</Button>
        </Link>
        <CardActions>
          {window.location.pathname === "/" && localStorage.getItem("token") ? <Button sx={{}} onClick={() => handleAddFav(id)}>{isFav ? <FavoriteIcon sx={{color: 'red'}} fontSize="large"/> : <FavoriteBorderIcon sx={{color: 'red'}}/> }</Button> : null}
        </CardActions>
      </Box>


    </Card >
  );
}

export default TravelCard;

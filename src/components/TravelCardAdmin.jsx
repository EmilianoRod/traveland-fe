import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function TravelCardAdmin({id, handleDelete, handleUpdate, nombre, descripcion, imagenes, categoria}) {

    const [imagenesUrl, setImagenesUrl] = useState([]);
    function buttonDelete(){
        handleDelete(id);
    }
    function buttonUpdate(){
        handleUpdate(id);
    }
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
      useEffect(() => {
        handleFetch();
      },[])
  

    return (
        <Card
            sx={{
                maxWidth: 200,
                maxHeight: "auto",
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.05)",
                },
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={imagenesUrl.length > 0 ? imagenesUrl[0] : "https://via.placeholder.com/200x200"}
                    height="200"
                    alt="description"
                />
                <CardContent>
                    <Typography variant="h5">{id + " " + nombre}</Typography>
                    <Typography component="p" variant="body2">
                        {descripcion}
                    </Typography>
                    <Typography component="p" variant="body2">
                        {categoria}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button onClick={buttonUpdate} sx={{backgroundColor: "green", color: "white"}}>MODIFICAR</Button>
                <Button onClick={buttonDelete} sx={{backgroundColor: "red", color: "white"}}>ELIMINAR</Button>
            </CardActions>
        </Card>
    )
}

export default TravelCardAdmin;
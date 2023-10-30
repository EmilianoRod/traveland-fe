import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function TravelCardAdmin({id, handleDelete, handleUpdate, nombre, descripcion, imagenes, categoria}) {

    function buttonDelete(){
        handleDelete(id);
    }
    function buttonUpdate(){
        handleUpdate(id, nombre, descripcion, categoria, imagenes);
    }

    return (
        <Card
            sx={{
                maxWidth: 200,
                maxHeight: 500,
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.05)",
                },
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image="https://via.placeholder.com/200x200"
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
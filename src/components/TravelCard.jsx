import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from 'react-router-dom'; 

function TravelCard({ nombre, descripcion, id }) { 
    return (
        <Link to={`/detalleproducto/${id}`}> {}
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
                        image="https://via.placeholder.com/200x200"
                        height="200"
                        alt="description"
                    />
                    <CardContent>
                        <Typography variant="h5">{nombre}</Typography>
                        <Typography component="p" variant="body2">
                            {descripcion}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button>VER MÁS..</Button>
                </CardActions>
            </Card>
        </Link>
    )
}

export default TravelCard;
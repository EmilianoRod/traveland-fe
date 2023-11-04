import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function Categoria({nombre}) {

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
                    <Typography variant="h5">{nombre}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export default Categoria;
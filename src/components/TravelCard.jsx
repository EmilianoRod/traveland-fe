import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function TravelCard() {
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
                    <Typography variant="h5">Card title</Typography>
                    <Typography component="p" variant="body2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti mollitia hic id quaerat veritatis pariatur.
                        Reprehenderit beatae, magni fugiat in quisquam facere sed delectus deserunt amet deleniti,
                        adipisci corporis error.
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button>button</Button>
            </CardActions>
        </Card>
    )
}

export default TravelCard;
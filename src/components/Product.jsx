import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";

function Product() {

    const Img = styled("img")({
        width: 200,
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    })
    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                overflow: "hidden",
                mt: 5
            }}>
            <Img
                src="https://via.placeholder.com/200"
                alt="imagen"
            />
            <Box>
                <Typography variant="h4">Product name</Typography>
                <Typography variant="body1">Product description</Typography>
                <Button variant="contained">zBoton</Button>
            </Box>
        </Paper>
    )
}

export default Product;
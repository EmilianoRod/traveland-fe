import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TravelCard from "./TravelCard";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFetch() {
    if (localStorage.getItem("id") != null) {
      fetch(
        "http://107.20.56.84/api/usuario/favs/" + localStorage.getItem("id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFavoritos(data);
        });
    }
  }

  function handleDesfav(id) {
    const check = window.confirm("¿Deseas quitar de favoritos el paseo?");
    if (check) {
      fetch(
        "http://107.20.56.84/api/usuario/deletefav/" +
          localStorage.getItem("id"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFavoritos(favoritos.filter((fav) => fav.id !== id));
        });
    }
  }
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Box
      sx={{
        display: "block",
        width: 1,
        textAlign: "center",
        pt: 3,
        pb: "auto",
        mt: 5,
      }}
    >
      <Box
        sx={{
          border: 2,
          padding: 5,
        }}
      >
        <Typography variant="h4">Tus paseos favoritos</Typography>
        <Grid container spacing={8} justifyContent="space-evenly" pt={15}>
          {favoritos.map((card) => {
            return (
              <Grid item key={card.id}>
                <TravelCard
                  nombre={card.nombre}
                  descripcion={card.descripcion}
                  imagenes={card.imagenes}
                  id={card.id}
                />
                <Button
                  onClick={() => handleDesfav(card.id)}
                  sx={{ color: "red" }}
                >
                  QUITAR DE FAVORITOS
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Favoritos;

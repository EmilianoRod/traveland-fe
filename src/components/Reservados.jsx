import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TravelCard from "./TravelCard";

function Reservados() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Realizar el fetch a los favoritos si el usuario ha iniciado sesion y esta en el localStorage
  function handleFetch() {
    if (localStorage.getItem("id") != null) {
      fetch(
        "http://107.20.56.84/api/reserva/usuario/" + localStorage.getItem("id"),
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
          setReservas(data);
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
        <Typography variant="h4">Tus reservas</Typography>
        {reservas.length == 0 ? (
          <Link sx={{ textDecoration: "none" }} href="/" variant="h5">
            No has realizado ninguna reserva, es tu momento de viajar!
          </Link>
        ) : null}
        <Grid container spacing={8} justifyContent="space-evenly" pt={5}>
          {reservas.map((card) => {
            return (
              <Grid textAlign="center" item key={card.producto.id}>
                <Typography sx={{ fontWeight: "bold" }}>Reservado el: {card.fechaYhora.slice(0, 10)}</Typography>
                <TravelCard
                  puntaje={card.producto.puntaje}
                  nombre={card.producto.nombre}
                  descripcion={card.producto.descripcion}
                  imagenes={card.producto.imagenes}
                  id={card.producto.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Reservados;

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CountrySelect from "../components/CountrySelect";
import TravelCard from "../components/TravelCard";
import Categoria from "../components/navbar/Categoria";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [randomCard, setRandomCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFiltrados, setLoadingFiltrados] = useState(false);
  const [favs, setFavs] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [renderCategorias, setRenderCategorias] = useState([]);
  const [catSelected, setCatSelected] = useState("");
  const [fechaInicial, setFechaInicial] = useState();
  const [fechafinal, setFechafinal] = useState();
  const [filtrados, setFiltrados] = useState();
  const [error, setError] = useState();

  function handleFetch() {
    fetch("http://107.20.56.84/api/producto/random/10", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRandomCard(
          data.map((card) => {
            return {
              id: card.id,
              nombre: card.nombre,
              descripcion: card.descripcion,
              imagenes: card.imagenes,
            };
          })
        );
      });

    fetch("http://107.20.56.84/api/categoria", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
        console.log(data);
      });
  }
  function getFavs() {
    if (localStorage.getItem("id") != null) {
      fetch(
        "http://107.20.56.84/api/usuario/favs/" + localStorage.getItem("id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFavs(data);
        });
    }
  }
  useEffect(() => {
    handleFetch();
    getFavs();
  }, []);

  function handleChange(changed) {
    console.log(changed);
    getFavs();
  }

  function handleCategoria(id) {
    fetch("http://107.20.56.84/api/categoria/products/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRenderCategorias(data);
        console.log(data);
      });
  }

  function handleFiltrarFecha() {
    if (fechaInicial != null && fechafinal != null) {
      setLoadingFiltrados(true);
      const desde =
        fechaInicial.slice(8, 10) +
        "/" +
        fechaInicial.slice(5, 7) +
        "/" +
        fechaInicial.slice(0, 4);
      const hasta =
        fechafinal.slice(8, 10) +
        "/" +
        fechafinal.slice(5, 7) +
        "/" +
        fechafinal.slice(0, 4);
      console.log(desde, hasta);
      fetch(
        `http://107.20.56.84/api/producto/filtrarFecha?fechaInicio=${desde}&fechaFin=${hasta}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFiltrados(data);
          setLoadingFiltrados(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Debe seleccionar ambas fechas");
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "block",
          border: 1,
          height: 200,
          width: 1,
          bgcolor: "#005F6B",
          color: "white",
          textAlign: "center",
          pt: 3,
          mt: 15,
        }}
      >
        <Typography variant="h4">BUSQUE AQUI SU DESTINO FAVORITO</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <label htmlFor="fechaInicial">Desde:</label>
          <input
            onChange={(e) => setFechaInicial(e.target.value)}
            id="fechaInicial"
            type={"date"}
            style={{ width: 200, height: 30 }}
          ></input>
          <label htmlFor="fechaFinal">Hasta:</label>
          <input
            onChange={(e) => setFechafinal(e.target.value)}
            id="fechaFinal"
            type={"date"}
            style={{ width: 200, height: 30 }}
          ></input>
          <Button onClick={handleFiltrarFecha} variant="contained">
            Buscar
          </Button>
        </Box>
        {error ? (
          <Typography
            sx={{ color: "red", padding: 1, marginTop: 2 }}
            severity="error"
          >
            {error}
          </Typography>
        ) : null}
      </Box>
      {loadingFiltrados ? (
        <CircularProgress
          sx={{ display: "block", margin: "auto" }}
          size={100}
        />
      ) : null}
      {filtrados ? (
        <Box>
          <Box
            sx={{
              border: 2,
              padding: 2,
            }}
          >
            <Grid container spacing={8} justifyContent="space-evenly">
              {filtrados.map((card) => {
                return (
                  <Grid item key={card.id}>
                    <TravelCard
                      nombre={card.nombre}
                      fechaInicio={card.fechaInicio}
                      fechaFinal={card.fechaFinal}
                      descripcion={card.descripcion}
                      imagenes={card.imagenes}
                      id={card.id}
                      favoritos={favs ? favs : null}
                      change={handleChange}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      ) : null}
      <Box>
        <Box>
          <Typography variant="h4">Categorias</Typography>
          <Box
            sx={{
              border: 2,
              padding: 2,
            }}
          >
            <Grid container spacing={8} justifyContent="space-evenly">
              {loading ? (
                <CircularProgress sx={{ marginTop: 10 }} size={100} />
              ) : null}
              {categorias.map((categoria) => {
                return (
                  <Grid
                    onClick={() => {
                      handleCategoria(categoria.id);
                      setCatSelected(categoria.nombre);
                    }}
                    key={categoria.id}
                    item
                  >
                    <Categoria nombre={categoria.nombre} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
        {catSelected ? (
          <Box>
            <Typography variant="h4">{catSelected}</Typography>
            <Box
              sx={{
                border: 2,
                padding: 2,
              }}
            >
              <Grid container spacing={8} justifyContent="space-evenly">
                {renderCategorias.map((card) => {
                  return (
                    <Grid item key={card.id}>
                      <TravelCard
                        nombre={card.nombre}
                        fechaInicio={card.fechaInicio}
                        fechaFinal={card.fechaFinal}
                        descripcion={card.descripcion}
                        imagenes={card.imagenes}
                        id={card.id}
                        favoritos={favs ? favs : null}
                        change={handleChange}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        ) : null}
        <Box>
          <Typography variant="h4">Recomendaciones</Typography>
          <Box
            sx={{
              border: 2,
              padding: 2,
            }}
          >
            <Grid container spacing={8} justifyContent="space-evenly">
              {loading ? (
                <CircularProgress sx={{ marginTop: 10 }} size={100} />
              ) : null}
              {randomCard.map((card) => {
                return (
                  <Grid item key={card.id}>
                    <TravelCard
                      nombre={card.nombre}
                      fechaInicio={card.fechaInicio}
                      fechaFinal={card.fechaFinal}
                      descripcion={card.descripcion}
                      imagenes={card.imagenes}
                      id={card.id}
                      favoritos={favs}
                      change={handleChange}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

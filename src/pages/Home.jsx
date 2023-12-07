import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import TravelCard from "../components/TravelCard";
import Categoria from "../components/navbar/Categoria";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
  const [nombreBusqueda, setNombreBusqueda] = useState();
  const [filtradoPorNombre, setFiltradoPorNombre] = useState();
  const [filtradoPorFecha, setFiltradoPorFecha] = useState(false);
  const [sinResultados, setSinResultados] = useState();


  const categoriasImg = ["https://traveland-g5.s3.amazonaws.com/Hospedaje.png", "https://traveland-g5.s3.amazonaws.com/Independiente.png",
                          "https://traveland-g5.s3.amazonaws.com/Guiada.png", "https://traveland-g5.s3.amazonaws.com/accesible.png",
                      ]

  // Se realiza el fetch para traer 10 cards aleatorias
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
              puntaje: card.puntaje,
            };
          })
        );
      });
    // Se realiza el fetch para traer las categorias
    fetch("http://107.20.56.84/api/categoria", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
        console.log(data);
      });
  }
  // Se realiza el fetch para traer los favoritos del usuario
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

  // Se obtiene de la travelCard si se actualizo el producto a favorito y si es así vuelve a renderizar los favoritos
  function handleChange(changed) {
    console.log(changed);
    getFavs();
  }
  // Se realiza el fetch para traer los productos segun la categoria
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

  // Se realiza el fetch para traer los productos filtrados por fecha
  function handleFiltrarFecha() {
    setSinResultados(null);
    // Si se seleccionaron ambas fechas y no son nulas, se arma el objeto para enviarle a la API las dos fechas con formato dd/mm/aaaa
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
      // Se realiza el fetch para traer los productos filtrados
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
          setFiltradoPorFecha(true);
          if (data.length === 0) {
            setSinResultados("No se encontraron resultados");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Debe seleccionar ambas fechas");
    }
  }

  function handleFiltrarPorNombre(e) {
    setSinResultados(null);
    setLoadingFiltrados(true);
    console.log(nombreBusqueda);
    fetch(
      `http://107.20.56.84/api/producto/filtrarNombre?nombre=${nombreBusqueda}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFiltrados(data);
        setLoadingFiltrados(false);
        setFiltradoPorNombre(nombreBusqueda);
        if (data.length === 0) {
          setSinResultados("No se encontraron resultados");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box>
      <Box
        sx={{
          display: "block",
          border: 1,
          height: 200,
          width: 'auto',
          bgcolor: "#005F6B",
          color: "white",
          textAlign: "center",
          pt: 3,
          mt: 15,
          boxShadow: "5px 5px 15px #005F6B",
        }}
      >
        <Typography variant="h4">BUSQUE AQUI SU DESTINO FAVORITO</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingTop: "3rem",
          }}
        >
          <Box>
            <label htmlFor="buscador">Buscar: </label>
            <input
              id="buscador"
              style={{ width: 200, height: 30, backgroundColor: "white" }}
              onChange={(e) => setNombreBusqueda(e.target.value)}
            ></input>
            <Button color='info' onClick={handleFiltrarPorNombre} variant="contained">
              <SearchIcon />
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: '2.5rem'
            }}>
            <Box>
              <label htmlFor="fechaInicial">Desde: </label>
              <input
                onChange={(e) => setFechaInicial(e.target.value)}
                id="fechaInicial"
                type={"date"}
                style={{ width: 200, height: 30 }}
              >
              </input>
            </Box>
            <Box>
              <label htmlFor="fechaFinal">Hasta: </label>
              <input
                onChange={(e) => setFechafinal(e.target.value)}
                id="fechaFinal"
                type={"date"}
                style={{ width: 200, height: 30 }}
              >
              </input>
              <Button color='info' onClick={handleFiltrarFecha} variant="contained">
                <SearchIcon />
              </Button>
            </Box>
          </Box>
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
              border: '1px solid #005F6B',
              padding: '7px',
              borderRadius: '7px'
            }}
          >
            {filtradoPorFecha && sinResultados == null ? (
              <Typography sx={{ margin: 2 }} variant="h4">
                Paseos entre el {fechaInicial.slice(0, 10)} y el{" "}
                {fechafinal.slice(0, 10)}
              </Typography>
            ) : null}
            {filtradoPorNombre && sinResultados == null ? (
              <Typography sx={{ margin: 2 }} variant="h4">
                Filtrando por {nombreBusqueda}
              </Typography>
            ) : null}

            <Grid container spacing={8} justifyContent="space-evenly">
              {sinResultados ? (
                <Grid item>
                  <Typography sx={{ color: "red", padding: 1, marginTop: 2 }}>
                    {sinResultados}
                  </Typography>
                </Grid>
              ) : null}
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
                      puntaje={card.puntaje}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      ) : null}
      <Box>
        <Box
          sx={{marginTop: '4rem'}}
        >
          <Typography variant="h4" color="primary">CATEGORIAS</Typography>
          <Box
            sx={{
              border: '1px solid #005F6B',
              padding: '7px',
              borderRadius: '7px'
            }}
          >
            <Grid container spacing={8} justifyContent="space-evenly">
              {loading ? (
                <CircularProgress sx={{ marginTop: 10 }} size={100} />
              ) : null}
              {categorias.map((categoria, index) => {
                                  console.log(index);
                return (
                  <Grid
                    onClick={() => {
                      handleCategoria(categoria.id);
                      setCatSelected(categoria.nombre);
                    }}
                    key={categoria.id}
                    item
                  >
                    
                    <Categoria nombre={categoria.nombre} img={categoriasImg[index]}/>
                  </Grid>
                );
              }
              )}
            </Grid>
          </Box>
        </Box>
        {catSelected ? (
          <Box
            sx={{
              paddingTop: '4rem'
            }}>
            <Typography variant="h4" color='primary'>{catSelected}</Typography>
            <Box
              sx={{
                border: 1,
                padding: '7px',
                borderRadius: '7px',
                paddingBottom: '2rem',
                paddingTop: '2rem'
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
                        puntaje={card.puntaje}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        ) : null}
        <Box
        sx={{marginTop: '4rem'}}>
          <Typography variant="h4" color="primary">RECOMENDACIONES</Typography>
          <Box
            sx={{
              border: 1,
              padding: '7px',
              borderRadius: '7px',
              paddingTop: '2rem',
              paddingBottom: '2rem'
            }}
          >
            <Grid container spacing={8} justifyContent="space-evenly" paddingTop={2} paddingBottom={2}>
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
                      puntaje={card.puntaje}
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

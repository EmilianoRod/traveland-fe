import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CountrySelect from "../components/CountrySelect";
import TravelCard from "../components/TravelCard";
<<<<<<< HEAD
import { Box, Button, Grid, Typography } from "@mui/material";
=======
import { useEffect, useState } from "react";
import Categoria from "../components/navbar/Categoria";
>>>>>>> 82786ad204860cb6ee62960b4253cf014500480d


function Home() {

    const [randomCard, setRandomCard] = useState([]);

    function handleFetch() {
        fetch("http://13.58.107.197/api/producto/random/10", { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
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
    }
    console.log(randomCard);

    useEffect(() => { handleFetch(); }, []);


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
                    mt: 15

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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="Basic date picker" sx={{backgroundColor: "white"}} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <CountrySelect />
                    <Button variant="contained">Buscar</Button>
                </Box>
            </Box>

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
                            <Grid item>
                                <Categoria nombre={"Excursión con hospedaje"}/>
                            </Grid>
                            <Grid item>
                            <Categoria nombre={"Excursión guiada"}/>
                            </Grid>
                            <Grid item>
                            <Categoria nombre={"Excursión Independiente"}/>
                            </Grid>
                            <Grid item>
                            <Categoria nombre={"Excursión Accesible"}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h4">Recomendaciones</Typography>
                    <Box
                        sx={{
                            border: 2,
                            padding: 2,
                        }}
                    >
                        <Grid container spacing={8} justifyContent="space-evenly">
                            {randomCard.map((card) => {
                                return (
                                    <Grid item key={card.id} >
                                        <TravelCard nombre={card.nombre} descripcion={card.descripcion} imagenes={card.imagenes} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default Home;
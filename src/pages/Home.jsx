import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CountrySelect from "../components/CountrySelect";
import TravelCard from "../components/TravelCard";
import { Box, Button, Grid, Typography } from "@mui/material";


function Home() {
    return (
        <Box >

            <Box
                sx={{
                    display: "block",
                    border: 1,
                    height: 200,
                    width: 1,
                    bgcolor: "#005F6B",
                    color: "white",
                    textAlign: "center",
                    pt: 3
                }}>
                <Typography variant="h4">BUSQUE AQUI SU DESTINO FAVORITO</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: "center",
                    gap: 10
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker"  />
                        </DemoContainer>
                    </LocalizationProvider>
                    <CountrySelect />
                    <Button variant="contained" >Buscar</Button>
                </Box>
            </Box>

            <Box>

                <Box>
                    <Typography variant="h4">Categorias</Typography>
                    <Box sx={{
                        border: 2,
                        padding: 2
                    }}>
                        <Grid container spacing={8} justifyContent="space-evenly">
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>

                        </Grid>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h4">Recomendaciones</Typography>
                    <Box sx={{
                        border: 2,
                        padding: 2
                    }}>
                        <Grid container spacing={8} justifyContent="space-evenly">
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>
                            <Grid item>
                                <TravelCard />
                            </Grid>

                        </Grid>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Home;


import { Box, Container, Grid, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "secondary.main",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container >
                <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>

                    <Grid container direction="row" justifyContent={"flex-start"} alignItems={"flex-start"}>
                        <Grid item >
                            <img src="public/logo 2.png" />
                        </Grid>
                        <Grid item >
                            <img src="public/logo Letras 1.png" />
                            <Typography color="white" variant="subtitle1">
                                {`© ${new Date().getFullYear()} Traveland`}
                            </Typography>
                        </Grid>


                        <Grid container direction="row" justifyContent={"flex-end"} alignItems={"center"}>
                        <Grid item >
                            <InstagramIcon sx={{ color: 'white' }} />
                        </Grid>
                        <Grid item >
                            <TwitterIcon sx={{ color: 'white' }} />
                        </Grid>
                        <Grid item >
                            <YouTubeIcon sx={{ color: 'white' }} />
                        </Grid>
                    </Grid>

                    </Grid>


                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
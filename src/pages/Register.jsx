import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function Register() {
    return (
        <Grid sx={{ mt: 25}}>
            <Paper elevation={20} sx={{ padding: '30px 20px', width: 300, margin: '20px auto' }} >
                <Grid align='center'>
                    <Avatar sx={{backgroundColor: '#005F6B'}}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={{ margin: 0 }}>Registrarse</h2>
                    <Typography variant="caption" gutterBottom>Por favor, llena el siguiente formulario para crear una cuenta</Typography>
                </Grid>
                <form >
                    <TextField fullWidth label="Nombre"></TextField>
                    <TextField fullWidth label="Apellido"></TextField>
                    <TextField fullWidth label="Email"></TextField>
                    <TextField fullWidth label="Telefono"></TextField>
                    <TextField fullWidth label="Contraseña"></TextField>
                    <TextField fullWidth label="Confirmar Contraseña"></TextField>
                    <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Register;
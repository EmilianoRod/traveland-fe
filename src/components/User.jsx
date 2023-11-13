import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

function User({handleDelete, handleUpdate, id, nombre, apellido, telefono, email, rol}){
    function buttonDelete(){
        console.log(id);
        handleDelete(id);
    }
    function buttonUpdate() {
        console.log(id);
        handleUpdate(id);
    }
    return (
        <Box key={id}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20, mt: 2, mb: 2 }}>
            <Typography sx={{ width: 50 }} >{id}</Typography>
            <Typography sx={{ width: 50 }} >{nombre}</Typography>
            <Typography sx={{ width: 50 }} >{apellido}</Typography>
            <Typography sx={{ width: 50 }} >{telefono}</Typography>
            <Typography sx={{ width: 50 }} >{email}</Typography>
            <Typography sx={{ width: 50 }} >{rol}</Typography>
            <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <Button onClick={buttonUpdate} sx={{backgroundColor: "green", color: "white"}}>Editar</Button>
            <Button onClick={buttonDelete} sx={{backgroundColor: "red", color: "white"}}>Eliminar</Button>
            </Box>
          </Box>
    )
}

export default User;
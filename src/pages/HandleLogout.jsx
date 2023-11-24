import { Box, CircularProgress, Typography } from "@mui/material";
import { padding } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HandleLogout(){


    // Se consulta si se desea cerrar sesión
    function handleLogout(){
        const check = window.confirm("Seguro que desea cerrar sesión?")
        if (check){
            localStorage.clear();
        window.location.replace("/login");
        }
    }

    useEffect(()=>{
        handleLogout();
    },[])

    return(
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}} pt={10}>
 
        <CircularProgress size={200} color="success" sx={{ display: "block", margin: "auto" }} />
    </Box>)
}

export default HandleLogout;
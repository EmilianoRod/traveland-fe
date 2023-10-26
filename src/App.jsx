import { Box, Button, Card, Container, Grid, Typography } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import { BorderColor } from '@mui/icons-material';
import Product from './components/Product';
import TravelCard from './components/TravelCard';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Footer from './components/Footer';
import Admin from './pages/Admin';

const navArrayLinks = [
    {
        title: "Home",
        path: "/",
        icon: <InboxIcon />
    },
    {
        title: "Iniciar sesion",
        path: "login",
        icon: <DraftsIcon />

    },
    {
        title: "Crear cuenta",
        path: "register",
        icon: <MenuIcon />
    }
]


function App() {

    return (
        <>
            <Navbar navArrayLinks={navArrayLinks} />
            <Container 
                maxWidth={false}
                sx={{
                    justifyContent: "center",
                    mt: 5,
                    mr: 0,
                    ml: 0,
                }}
            >

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/administracion' element={<Admin/>} />

                </Routes>

            </Container>
            <Footer/>

        </>

    )
}

export default App

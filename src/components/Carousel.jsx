import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Item from './Item';

function Carousel(props){



    const categoriasImg = ["https://traveland-g5.s3.amazonaws.com/Hospedaje.png", "https://traveland-g5.s3.amazonaws.com/Independiente.png",
    "https://traveland-g5.s3.amazonaws.com/Guiada.png", "https://traveland-g5.s3.amazonaws.com/accesible.png"]

    return (
        <Carousel>
            {
                categoriasImg.map( item => <img src={item}/> )
            }
        </Carousel>
    )
}

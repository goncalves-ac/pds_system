import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu } from '../../components'
import axios from 'axios'
import Box from '@mui/material/Box'
import Outubro from '../../../src/assets/outubro-rosa.png'

const Home: React.FC = () => {

    const url = 'http://localhost:8083/api/get-all/psicologos'

    function getUser() {
        axios.get(url)
            .then(response => {
                console.log(response)
            })
            .catch(e => console.log(e))
    }

    console.log(getUser())


const Home: React.FC = () => {

    return (
        <Container
            width='100vw'
            height='100vh'
            justify='center'
            flexDirection='row'
        >
            <AppBar />
            <Menu />

            <Box sx={{ display: 'flex', padding: '15rem 5rem 0 10rem', width: '100%', height: '100%', flexDirection: 'column' }}>
                <div style={{ height:'50%', padding: '50px 100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Container backgroundImg={Outubro} borderRadius='25px' />
                </div>
                <div style={{height:'50%', display: 'flex', flexDirection: 'column', padding: '0 100px'}}>
                    <div style={{ width: '100%', paddingBottom: 30, fontWeight: 'bold'}}>Últimas notícias:</div>
                    <div style={{ width: '100%', height:'100%', display: 'flex', justifyContent: 'space-evenly'}}>
                        <Box> Notícia 1:</Box>
                        <Box> Notícia 2:</Box>
                        <Box> Notícia 3:</Box>
                        <Box> Notícia 4:</Box>
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default Home

import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'

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

            <Box sx={{ display: 'flex', padding: '15rem 5rem 0 10rem', width: '100%', height: '100%' }}>
               HOME
            </Box>

        </Container>
    )
}

export default Home

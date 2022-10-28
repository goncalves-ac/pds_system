import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'

const Secretaria: React.FC = () => {

    const secretarias = [{
        id: '123456',
        nome: 'Fulana da Silva',
        diasTrabalho: 'Segunda e quarta-feira',
        horario: '08:00 às 12:00',
    },
    {
        id: '123456',
        nome: 'Joana da Silva',
        diasTrabalho: 'Segunda e quarta-feira',
        horario: '08:00 às 12:00',
    },
    {
        id: '123456',
        nome: 'Joana da Silva',
        diasTrabalho: 'Segunda e quarta-feira',
        horario: '08:00 às 12:00',
    },
    ]

    const colunasSecretarias = [
        'ID Secretária',
        'Nome da secretária',
        'Dias de trabalho',
        'Horário',
        'Ações',
    ]

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
                <UsuarioList
                    titulo="Secretarias"
                    colunas={colunasSecretarias}
                    documentos={secretarias}
                />
            </Box>

        </Container>
    )
}

export default Secretaria

import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'

const Psicologo: React.FC = () => {

    const psicologos = [{
        id: '123456',
        nome: 'Carlos Alberto',
        diasAtendimento: 'Segunda e quarta-feira',
        atendidoPor: 'Psiquiatra',
    },
    {
        id: '123456',
        nome: 'Carlos Alberto',
        diasAtendimento: 'Segunda e quarta-feira',
        atendidoPor: 'Psiquiatra',
    },
    {
        id: '123456',
        nome: 'Carlos Alberto',
        diasAtendimento: 'Segunda e quarta-feira',
        atendidoPor: 'Psiquiatra',
    },
    ]

    const colunasPsicologos = [
        'ID Psicologo',
        'Nome do psicólogo',
        'Dias de atendimento',
        'Especialidade',
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
                    titulo="Psicólogos"
                    colunas={colunasPsicologos}
                    documentos={psicologos}
                />
            </Box>

        </Container>
    )
}

export default Psicologo

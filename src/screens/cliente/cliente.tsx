import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'

const Cliente: React.FC = () => {

    const clientes = [{
        id: '123456',
        nome: 'Abner Bicalho',
        data: '10/08/2022',
        atendidoPor: 'João Vicente',
        telefone: '(31) 9999999',
    },
    {
        id: '123456',
        nome: 'Abner Bicalho',
        data: '10/08/2022',
        atendidoPor: 'João Vicente',
        telefone: '(31) 9999999',
    },
    {
        id: '123456',
        nome: 'Abner Bicalho',
        data: '10/08/2022',
        atendidoPor: 'João Vicente',
        telefone: '(31) 9999999',
    },
    ]

    const colunasCliente = [
        'ID Cliente',
        'Nome do cliente',
        'Data atendimentos',
        'Atendido por',
        'Telefone',
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
                    titulo="Clientes"
                    colunas={colunasCliente}
                    documentos={clientes}
                />
            </Box>

        </Container>
    )
}

export default Cliente

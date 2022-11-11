import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu } from '../../components'
import Box from '@mui/material/Box'
import axios from 'axios'
import { Title, Subtitle, Text } from '../../components/UsuarioList/styles'
import CloseIcon from '@mui/icons-material/Close'
import { Input } from '../../components'
import CreateIcon from '@mui/icons-material/Create'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'

const Psicologo: React.FC = () => {

    const [psicologos, setPsicologos]: any = React.useState(null)
    const [pesquisa, setPesquisa] = React.useState<string>('')


    const url = 'http://localhost:8083/api/get-all/psicologos'

    React.useEffect(() => {
        axios.get(url)
            .then(response => {
                setPsicologos(response.data)
            })
            .catch(e => console.log(e))
    }, [])

    const colunas = [
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
                <Box sx={{ width: '100%', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <Title>Psicólogos</Title>
                        <CloseIcon />
                    </Box>
                    <Box sx={{ margin: '2rem 0' }}>
                        <Input
                            value={pesquisa}
                            setValue={setPesquisa}
                            placeholder='Pesquisar...'
                            width='30%'
                            icon='search'
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderTop: '2px solid purple',
                            borderBottom: '2px solid purple',
                            marginBottom: '1rem',
                            gap: '0.5rem',
                        }}
                    >
                        {colunas.map((item, index) => {
                            return (
                                <>
                                    <Subtitle key={'coluna' + index}>
                                        {item}
                                    </Subtitle>
                                </>
                            )
                        }
                        )}

                    </Box>
                    <Box>
                        {psicologos !== null && psicologos?.map((item: any) => {
                            return (
                                <Box key='teste' sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid silver', gap: '0.5rem' }}>
                                    <Text>{item?.id}</Text>
                                    <Text>{item?.nome}</Text>
                                    <Text>{item?.cpf}</Text>
                                    <Text>{item?.telefone}</Text>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '15%' }}>
                                        <CreateIcon sx={{ marginRight: '2rem' }} />
                                        <TextSnippetIcon />
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>

        </Container>
    )
}

export default Psicologo

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
import { useNavigate } from 'react-router-dom'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Modal from '@mui/material/Modal'

const Cliente: React.FC = () => {

    const navigate = useNavigate()
    const [clientes, setClientes]: any = React.useState(null)
    const [pesquisa, setPesquisa] = React.useState<string>('')

    // Modal edição
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // Dados edição usuário
    const [email, setEmail] = React.useState('')
    const [cpf, setCpf] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [responsavel, setResponsavel] = React.useState('')
    const [cep, setCep] = React.useState('')
    const [estado, setEstado] = React.useState('')
    const [cidade, setCidade] = React.useState('')
    const [bairro, setBairro] = React.useState('')
    const [rua, setRua] = React.useState('')
    const [numero, setNumero] = React.useState('')

    // Recuperando clientes do backend
    const url = 'http://localhost:8083/api/get-all/clientes'

    React.useEffect(() => {
        axios.get(url)
            .then(response => {
                setClientes(response.data)
            })
            .catch(e => console.log(e))
    }, [])

    const colunas = [
        'ID',
        'Nome do cliente',
        'CPF',
        'Telefone',
        'Ações',
    ]

    const style = {
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '80%',
        scrollY: 'scroll',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    }

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
                        <Title>Clientes</Title>
                        <IconButton onClick={() => navigate('/home')}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
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
                        {clientes !== null && clientes?.map((item: any) => {
                            return (
                                <Box key='teste' sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid silver', gap: '0.5rem' }}>
                                    <Text>{item?.id}</Text>
                                    <Text>{item?.nome}</Text>
                                    <Text>{item?.cpf}</Text>
                                    <Text>{item?.telefone}</Text>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '15%', gap: '1.5rem' }}>
                                        <IconButton onClick={handleOpen}><CreateIcon /></IconButton>
                                        <IconButton><TextSnippetIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Subtitle>Dados de cadastro</Subtitle>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Nome</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={email}
                                    setValue={setEmail}
                                    placeholder='E-mail'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>CPF</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={cpf}
                                    setValue={setCpf}
                                    placeholder='000.000.000-00'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Telefone</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={telefone}
                                    setValue={setTelefone}
                                    placeholder='Ex.: (99) 99999-9999'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Responsável (opcional)</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={responsavel}
                                    setValue={setResponsavel}
                                    placeholder='Pai ou responsável pela criança'
                                    width='100%'
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Subtitle>Endereço</Subtitle>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Cep</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={cep}
                                    setValue={setCep}
                                    placeholder='00000-000'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Estado</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={estado}
                                    setValue={setEstado}
                                    placeholder='Selecione'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Cidade</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={cidade}
                                    setValue={setCidade}
                                    placeholder='Selecione'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Bairro</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={bairro}
                                    setValue={setBairro}
                                    placeholder='Ex.: Vila Glória'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Rua</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={rua}
                                    setValue={setRua}
                                    placeholder='Ex.: Rua Alves'
                                    width='100%'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                <Typography>Número</Typography>
                                <Input
                                    borderColor={undefined}
                                    value={numero}
                                    setValue={setNumero}
                                    placeholder='100'
                                    width='100%'
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

export default Cliente

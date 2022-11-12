import React from 'react'
import { Container } from '../../layout'
import { AppBar, Input, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'
import { Title, Subtitle, Text, Label } from './styles'
import CloseIcon from '@mui/icons-material/Close'
import Radio from '@mui/material/Radio'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Cadastro: React.FC = () => {

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

    const navigate = useNavigate()


    const [selectedValue, setSelectedValue] = React.useState('a')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value)
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

            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10rem 15rem 10rem 15rem', width: '100%', height: '80%', overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <Title>Cadastrar usuário</Title>
                    <IconButton onClick={() => navigate('/home')}>
                        <CloseIcon sx={{color: 'black'}} />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Subtitle>Tipo de usuário</Subtitle>

                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Text>Paciente</Text>
                        <Radio
                            checked={selectedValue === 'b'}
                            onChange={handleChange}
                            value="b"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <Text>Psicologo</Text>
                        <Radio
                            checked={selectedValue === 'c'}
                            onChange={handleChange}
                            value="c"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'C' }}
                        />
                        <Text>Secretária</Text>

                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', marginTop: '2rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingRight: '4rem' }}>
                        <Subtitle>Dados de cadastro</Subtitle>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Nome</Label>
                            <Input
                                borderColor={undefined}
                                value={email}
                                setValue={setEmail}
                                placeholder='E-mail'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>CPF</Label>
                            <Input
                                borderColor={undefined}
                                value={cpf}
                                setValue={setCpf}
                                placeholder='000.000.000-00'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Telefone</Label>
                            <Input
                                borderColor={undefined}
                                value={telefone}
                                setValue={setTelefone}
                                placeholder='Ex.: (99) 99999-9999'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Responsável (opcional)</Label>
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
                            <Label>Cep</Label>
                            <Input
                                borderColor={undefined}
                                value={cep}
                                setValue={setCep}
                                placeholder='00000-000'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Estado</Label>
                            <Input
                                borderColor={undefined}
                                value={estado}
                                setValue={setEstado}
                                placeholder='Selecione'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Cidade</Label>
                            <Input
                                borderColor={undefined}
                                value={cidade}
                                setValue={setCidade}
                                placeholder='Selecione'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Bairro</Label>
                            <Input
                                borderColor={undefined}
                                value={bairro}
                                setValue={setBairro}
                                placeholder='Ex.: Vila Glória'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Rua</Label>
                            <Input
                                borderColor={undefined}
                                value={rua}
                                setValue={setRua}
                                placeholder='Ex.: Rua Alves'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Número</Label>
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

        </Container>
    )
}

export default Cadastro

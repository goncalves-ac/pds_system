import React from 'react'
import { Container } from '../../layout'
import { AppBar, Input, Menu, UsuarioList } from '../../components'
import Box from '@mui/material/Box'
import { Title, Subtitle, Text, Label } from './styles'
import CloseIcon from '@mui/icons-material/Close'
import Radio from '@mui/material/Radio'
import axios from 'axios'
import { Button } from '@mui/material'

interface UsuarioRequest {
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    endereco: {
        complemento: string,
        numero: string,
        estado: string,
        bairro: string,
        cidade: string,
        cep: string
    },
    workDays?: string,
    workHours?: string
    crp?: string,
    especialidade?: string
}

const Cadastro: React.FC = () => {

    const [nome, setNome] = React.useState('')
    const [cpf, setCpf] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [responsavel, setResponsavel] = React.useState('')
    const [cep, setCep] = React.useState('')
    const [estado, setEstado] = React.useState('')
    const [cidade, setCidade] = React.useState('')
    const [bairro, setBairro] = React.useState('')
    const [rua, setRua] = React.useState('')
    const [numero, setNumero] = React.useState('')
    const [complemento, setComplemento] = React.useState('')
    const [tipoUsuario, setTipoUsuario] = React.useState('clientes')

    //--------SECRETARIO
    const [workDays, setWorkDays] = React.useState('')
    const [workHours, setWorkHours] = React.useState('')

    //--------PSICOLOGO
    const [crp, setCrp] = React.useState('')
    const [especialidade, setEspecialidade] = React.useState('')


    const [selectedValue, setSelectedValue] = React.useState('clientes')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value)
        setTipoUsuario(event.target.value)
    }

    const url = `http://localhost:8083/api//add/${tipoUsuario}`

    const submitCadastro = () => {

        let request: UsuarioRequest = {
            nome,
            telefone,
            cpf,
            email,
            endereco: {
                estado,
                cidade,
                bairro, 
                numero,
                complemento,
                cep,
            },
        }

        if (tipoUsuario === 'psicologos') {

            request = {
                ...request,
                crp,
                workDays,
                especialidade,
            }

        } else if (tipoUsuario === 'secretarias') {

            request = {
                ...request,
                workDays,
                workHours,
            }
        }

        axios.post(url, request)
            .then((response: { data: any }) => {
                console.log(response)
            })
            .catch(e => console.log(e))
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
                    <CloseIcon />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Subtitle>Tipo de usuário</Subtitle>

                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <Radio
                            checked={selectedValue === 'clientes'}
                            onChange={handleChange}
                            value="clientes"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Text>Paciente</Text>
                        <Radio
                            checked={selectedValue === 'psicologos'}
                            onChange={handleChange}
                            value="psicologos"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <Text>Psicologo</Text>
                        <Radio
                            checked={selectedValue === 'secretarias'}
                            onChange={handleChange}
                            value="secretarias"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'C' }}
                        />
                        <Text>Secretário</Text>

                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', marginTop: '2rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingRight: '4rem' }}>
                        <Subtitle>Dados de cadastro</Subtitle>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Nome</Label>
                            <Input
                                borderColor={undefined}
                                value={nome}
                                setValue={setNome}
                                placeholder='Nome'
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

                        {tipoUsuario !== 'clientes' && 
                            <>
                                <Subtitle>Dados de Cargo</Subtitle>

                                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                    <Label>Dias de trabalho</Label>
                                    <Input
                                        borderColor={undefined}
                                        value={workDays}
                                        setValue={setWorkDays}
                                        placeholder='Ex.: Segunda à Sexta'
                                        width='100%'
                                    />
                                </Box>

                                {tipoUsuario === 'secretarias' ?

                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                        <Label>Horário de trabalho</Label>
                                        <Input
                                            borderColor={undefined}
                                            value={workHours}
                                            setValue={setWorkHours}
                                            placeholder='Ex.: 07h às 15h'
                                            width='100%'
                                        />
                                    </Box> :
                                    <>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                            <Label>Especialidade</Label>
                                            <Input
                                                borderColor={undefined}
                                                value={especialidade}
                                                setValue={setEspecialidade}
                                                placeholder='Ex.: Psicanálise'
                                                width='100%'
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                                            <Label>CRP</Label>
                                            <Input
                                                borderColor={undefined}
                                                value={crp}
                                                setValue={setCrp}
                                                placeholder='Ex.: 3111111'
                                                width='100%'
                                            />
                                        </Box>
                                    </> 
                                }
                            </>
                        }
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

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                            <Label>Número</Label>
                            <Input
                                borderColor={undefined}
                                value={numero}
                                setValue={setNumero}
                                placeholder='100'
                                width='100%'
                            />
                        </Box>
                        
                        <Button
                            variant='contained'
                            disabled={(!nome || !cpf || !telefone)}
                            style={{width: 200, color: 'white', backgroundColor: '#8778BB', borderRadius: 25}}
                            onClick={submitCadastro}
                        >
                            Cadastrar
                        </Button>
                    </Box>

                </Box>
            </Box>

        </Container>
    )
}

export default Cadastro

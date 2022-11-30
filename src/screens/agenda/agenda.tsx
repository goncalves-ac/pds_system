import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Container } from '../../layout'
import { AppBar, Input, Menu } from '../../components'
import Box from '@mui/material/Box'
import './agenda.css'
import axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Label, Subtitle, Text } from '../cadastro/styles'


interface ConsultaRequest {
    nomeCliente: string,
    nomePsicologo: string,
    dia: string,
    mes: string,
    ano: string,
    hora: string,
}

const Agenda: React.FC = () => {

    const [date, setDate] = useState(new Date())

    const [open, setOpen] = React.useState(false)
    const [openConsulta, setOpenConsulta] = React.useState(false)

    const [nomeCliente, setNomeCliente] = React.useState('')
    const [nomePsicologo, setNomePsicologo] = React.useState('')
    const [dia, setDia] = React.useState('')
    const [mes, setMes] = React.useState('')
    const [ano, setAno] = React.useState('')
    const [hora, setHora] = React.useState('')

    const [consultas, setConsultas]: any = React.useState(null)
    const [modalConsulta, setModalConsulta]: any = React.useState()

    const colunas = [
        'Horário',
        'Paciente',
        'Profissional',
    ]

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setOpenConsulta(false)
    }

    const openConsultasModal = (data: React.SetStateAction<Date>) => {

        setDate(data)
        const novaData = new Date(data.toString())
        const [day, month, year] = [novaData.getDate().toString(), (novaData.getMonth() + 1).toString() , novaData.getFullYear().toString()]
        console.log(novaData.toDateString(), day, month, year)

        const filterConsulta = consultas.filter((consulta: any) => consulta.dia === day && consulta.mes === month && consulta.ano === year)
        console.log(filterConsulta)

        setModalConsulta(filterConsulta)
        setOpenConsulta(true)
    }


    const addUrl = 'http://localhost:8083/api/add/consultas'

    const getUrl = 'http://localhost:8083/api/get-all/consultas'

    const submitConsulta = () => {

        const request: ConsultaRequest = {
            nomeCliente,
            nomePsicologo,
            dia,
            mes,
            ano,
            hora,
        }

        axios.post(addUrl, request)
            .then((response: { data: any }) => {
                console.log(response)

                axios.get(getUrl)
                    .then(resp => {
                        console.log(resp)
                        setConsultas(resp.data)
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

        setOpen(false)
    }

    // Recuperando consultas do backend

    React.useEffect(() => {
        axios.get(getUrl)
            .then(response => {
                console.log(response)
                setConsultas(response.data)
            })
            .catch(e => console.log(e))
    }, [])

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
                <Button data-cy={'button-add-consulta'} onClick={handleClickOpen} style={{width: 200, color: 'white', backgroundColor: '#8778BB', borderRadius: 25}}>
                    Adicionar consulta
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Nova consulta</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Nome Paciente</Label>
                            <Input
                                borderColor={undefined}
                                value={nomeCliente}
                                setValue={setNomeCliente}
                                placeholder='nome paciente'
                                width='100%'
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Nome Psicologo</Label>
                            <Input
                                borderColor={undefined}
                                value={nomePsicologo}
                                setValue={setNomePsicologo}
                                placeholder='nome psicologo'
                                width='100%'
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Dia</Label>
                            <Input
                                borderColor={undefined}
                                value={dia}
                                setValue={setDia}
                                placeholder='dia'
                                width='100%'
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Mes</Label>
                            <Input
                                borderColor={undefined}
                                value={mes}
                                setValue={setMes}
                                placeholder='mes'
                                width='100%'
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Ano</Label>
                            <Input
                                borderColor={undefined}
                                value={ano}
                                setValue={setAno}
                                placeholder='ano'
                                width='100%'
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem' }}>
                            <Label>Hora</Label>
                            <Input
                                borderColor={undefined}
                                value={hora}
                                setValue={setHora}
                                placeholder='hora'
                                width='100%'
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined' style={{width: 200, color: '#8778BB', border: '1px solid #8778BB', borderRadius: 25}}>Cancelar</Button>
                        <Button onClick={submitConsulta} style={{width: 200, color: 'white', backgroundColor: '#8778BB', borderRadius: 25}}>Salvar</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openConsulta} onClose={handleClose}>
                    <DialogTitle>{date.toLocaleDateString()}</DialogTitle>
                    <DialogContent>
                        {modalConsulta?.length ? 
                            <>  
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
                                    {modalConsulta?.map((item: any) => {
                                        return (
                                            <Box key='teste' sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid silver', gap: '0.5rem' }}>
                                                <Text>{item?.hora}</Text>
                                                <Text>{item?.nomeCliente}</Text>
                                                <Text>{item?.nomePsicologo}</Text>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </> : 
                            <Box>
                                <Typography>Não há consultas para essa data</Typography>
                            </Box>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined' style={{width: 200, color: '#8778BB', border: '1px solid #8778BB', borderRadius: 25}}>Fechar</Button>
                    </DialogActions>
                </Dialog>

                <div>
                    <h1 className='text-center'>Agenda</h1>
                    <div className='calendar-container'>
                        <Calendar onChange={openConsultasModal} value={date} />
                    </div>
                </div>

            </Box>
        </Container>
    )
}

export default Agenda

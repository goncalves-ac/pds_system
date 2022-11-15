import React from 'react'
import { Container } from '../../layout'
import { AppBar, Menu } from '../../components'
import Box from '@mui/material/Box'
import Outubro from '../../../src/assets/outubro-rosa.png'
import Setembro from '../../../src/assets/setembro.png'
import Novembro from '../../../src/assets/novembro.png'
import vacina from '../../../src/assets/vacinacao.jpg'
import Diabete from '../../../src/assets/diabete.webp'
import { Button, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props
  
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

const Home: React.FC = () => {
    
    const [open, setOpen] = React.useState(false)
    const [titulo, setTitulo] = React.useState('Novembro Azul')
    const [texto, setTexto] = React.useState('No mês dedicado à saúde do homem, o Ministério da Saúde realizou uma ação durante uma partida de futebol no estádio do Maracanã, no Rio de Janeiro (RJ). Os torcedores foram recebidos com orientações sobre a importância do diagnóstico precoce do câncer de próstata. A ação é parte da Campanha “Novembro Azul”, cujo tema deste ano é “Homem, cuide da sua saúde de novembro a novembro”.')

    const handleClickOpen1 = () => {
        setTitulo('Novembro Azul')
        setTexto('No mês dedicado à saúde do homem, o Ministério da Saúde realizou uma ação durante uma partida de futebol no estádio do Maracanã, no Rio de Janeiro (RJ). Os torcedores foram recebidos com orientações sobre a importância do diagnóstico precoce do câncer de próstata. A ação é parte da Campanha “Novembro Azul”, cujo tema deste ano é “Homem, cuide da sua saúde de novembro a novembro”.')
        setOpen(true)
    }
    const handleClickOpen2 = () => {
        setTitulo('Combate a diabetes')
        setTexto('O Dia Mundial do Combate ao Diabetes é comemorado neste 14 de novembro. A seguir selecionamos 3 dicas para você guardar com carinho sobre prevenção e cuidado com esta doença. Diabetes é uma síndrome metabólica de origem múltipla, decorrente da falta de insulina e/ou da incapacidade e/ou falta de insulina exercer adequadamente seus efeitos, caracterizando altas taxa de açúcar no sangue de forma permanente.')
        setOpen(true)
    }
    const handleClickOpen3 = () => {
        setTitulo('Outubro Rosa')
        setTexto('O movimento internacional de conscientização para a detecção precoce do câncer de mama, Outubro Rosa, foi criado no início da década de 1990, quando o símbolo da prevenção ao câncer de mama — o laço cor-de-rosa — foi lançado pela Fundação Susan G. Komen for the Cure e distribuído aos participantes da primeira Corrida pela Cura, realizada em Nova York (EUA) e, desde então, promovida anualmente.')
        setOpen(true)
    }
    const handleClickOpen4 = () => {
        setTitulo('Vacinação')
        setTexto('ALERTA! O Ministério da Saúde alertou, na sexta-feira (11), que mais de 69 milhões de brasileiros não receberam a primeira dose de reforço das vacinas contra a Covid-19. Em relação à segunda dose de reforço, 32,8 milhões de pessoas aptas não retornaram aos postos de saúde para a imunização. Especialistas em saúde pública destacam que as doses de reforço são necessárias para recompor a imunidade e a proteção contra a doença, que tende a diminuir com o passar do tempo.')
        setOpen(true)
    }
    const handleClickOpen5 = () => {
        setTitulo('Setembro Amarelo')
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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

            <Box sx={{ display: 'flex', padding: '15rem 5rem 0 10rem', width: '100%', height: '100%', flexDirection: 'column' }}>
                <div style={{ height:'50%', padding: '50px 100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={handleClickOpen1}>
                    <Container backgroundImg={Novembro} borderRadius='25px' />
                </div>
                <div style={{height:'50%', display: 'flex', flexDirection: 'column', padding: '0 100px'}}>
                    <div style={{ width: '100%', paddingBottom: 30, fontWeight: 'bold'}}>Últimas notícias:</div>
                    <div style={{ width: '100%', height:'40%', display: 'flex', justifyContent: 'space-evenly'}}>
                        <div style={{ width: '20%'}} onClick={handleClickOpen2}>
                            <Box> Combate a diabetes:</Box>
                            <Container backgroundImg={Diabete}/>
                        </div>
                        <div style={{ width: '20%'}} onClick={handleClickOpen3} >
                            <Box> Outubro Rosa:</Box>
                            <Container backgroundImg={Outubro}/>
                        </div>
                        <div style={{ width: '20%'}} onClick={handleClickOpen4}>
                            <Box> Vacinação:</Box>
                            <Container backgroundImg={vacina}/>
                        </div>
                        <div style={{ width: '20%'}} onClick={handleClickOpen5}>
                            <Box> Setembro Amarelo:</Box>
                            <Container backgroundImg={Setembro}/>
                        </div>
                    </div>
                </div>
            </Box>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {titulo}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {texto}
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </Container>
    )
}

export default Home

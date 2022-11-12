import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks'
import { Container } from '../../layout'
import { Input, Button } from '../../components'
import { Title, Text, InfoText, Link } from './styles'
import Background from '../../assets/background.png'
import Logo from '../../assets/logo.png'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [validate, setValidate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { setToken } = useAuth()
    const navigate = useNavigate()

    const onLogin = async () => {
        navigate('/home')
        setValidate(true)

        if (email && password) {
            setLoading(true)

            new Promise((res) => {
                setTimeout(() => {
                    res('token')
                }, 10000)
            })
                .then((token) => setToken(token as string))
                .catch(e => console.log('error on login: ', e))
                .finally(() => setLoading(false))
        }
    }

    console.log(Background)

    return (
        <Container
            width='100vw'
            height='100vh'
            justify='center'
            backgroundImg={Background}
            flexDirection='row'
        >
            <Container flex={1} justify='center'>
                <img src={Logo} style={{ maxWidth: 400 }} />
            </Container>
            <Container
                flex={1}
                justify='center'
                gap={50}
            >
                <Title>Boas-vindas à Clínica Social</Title>
                <Container
                    width={450}
                    height={450}
                    backgroundColor='#fff'
                    borderRadius={20}
                    justify='space-around'
                >
                    <Text>Acessar o Sistema</Text>
                    <Input
                        borderColor={validate && !email ? 'red' : undefined}
                        value={email}
                        setValue={setEmail}
                        placeholder='E-mail'
                        width='80%'
                        icon='email'
                    />
                    <Input
                        value={password}
                        setValue={setPassword}
                        type='password'
                        placeholder='Senha'
                        width='80%'
                        borderColor={validate && !password ? 'red' : undefined}
                    />
                    <Button
                        width={200}
                        backgroundColor='#8778BB'
                        textColor='#fff'
                        onClick={onLogin}
                        loading={loading}
                    >
                        Entrar
                    </Button>
                    <Container
                        height={30}
                        flexDirection='row'
                        justify='center'
                        gap={10}
                    >
                        <InfoText>Esqueceu a senha?</InfoText>
                        <Link onClick={() => navigate('/reset-password')}>Redefinir a senha</Link>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default Login

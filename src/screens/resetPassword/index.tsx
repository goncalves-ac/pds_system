import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container } from '../../layout'
import { Input, Button } from '../../components'
import { Title } from './styles'
import Background from '../../assets/background.png'
import Logo from '../../assets/logo.png'

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [validate, setValidate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const reset = async () => {
        setValidate(true)

        if (newPassword && repeatPassword && newPassword === repeatPassword) {
            setLoading(true)

            new Promise((res) => {
                setTimeout(() => {
                    console.log('reset the pass')
                    res(undefined)
                }, 10000)
            })
                .then(() => navigate('/'))
                .catch(e => console.log('error on reset password: ', e))
                .finally(() => setLoading(false))
        }
    }

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
                <Title>Redefinir Senha</Title>
                <Container
                    width={450}
                    height={450}
                    backgroundColor='#fff'
                    borderRadius={20}
                    justify='center'
                    gap={30}
                >
                    <Input
                        borderColor={validate && (!newPassword || newPassword !== repeatPassword) ? 'red' : undefined}
                        value={newPassword}
                        setValue={setNewPassword}
                        placeholder='Senha'
                        width='80%'
                        type='password'
                    />
                    <Input
                        value={repeatPassword}
                        setValue={setRepeatPassword}
                        type='password'
                        placeholder='Repetir a Senha'
                        width='80%'
                        borderColor={validate && (!repeatPassword || newPassword !== repeatPassword) ? 'red' : undefined}
                    />
                    <Button
                        width={200}
                        backgroundColor='#8778BB'
                        textColor='#fff'
                        onClick={reset}
                        loading={loading}
                    >
                        Redefinir
                    </Button>
                </Container>
            </Container>
        </Container>
    )
}

export default ResetPassword

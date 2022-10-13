import React from 'react'

import { Container } from '../../layout'
import Logo from '../../assets/logo.png'
import Avatar from '../../assets/avatar.svg'

const AppBar: React.FC = () => {
    return (
        <Container id='topAppBar'
            width='100vw'
            height='84px'
            backgroundColor='#BAB0DF'
            position='absolute'
            top='0px'
            justify='space-between'
            flexDirection='row'
            zIndex={10}
        >
            <Container id='logo'
                width='49px'
                height='48px'
                margin='0 16px'
                backgroundImg={Logo}
            />
            <Container id='user-info'
                flexDirection='row'
                width='auto'
            >
                <Container id='user-name'
                    margin='0 16px'
                    width='auto'
                    justify='center'
                    align='flex-start'
                >
                    <div>
                        Usuario {/* TODO: retornar nome do usuario */}
                    </div>
                    <div style={{color:'#9C3B66'}}>
                        Cargo   {/* TODO: retornar papel do usuario */}
                    </div>
                </Container>
                <Container id='user-avatar'
                    width='40px'
                    height='40px'
                    margin='0 50px 0 0'
                    justify='center'
                    backgroundColor='white'
                    borderRadius='25px'
                >
                    <Container
                        width='25px'
                        height='25px'
                        backgroundImg={Avatar} 
                    />
                </Container>
            </Container>

        </Container>
    )
}

export default AppBar

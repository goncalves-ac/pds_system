import React from 'react'
import { Container } from '../../layout'
import Outubro from '../../assets/outubro-rosa.png'
import { AppBar, Menu } from '../../components'

const Home: React.FC = () => {


    return (
        <Container
            width='100vw'
            height='100vh'
            justify='center'
            flexDirection='row'
        >
            <AppBar/>
            <Menu/>

            <div>
                <Container
                    backgroundImg={Outubro}
                >
                </Container>
            </div>
           
        </Container>
    )
}

export default Home

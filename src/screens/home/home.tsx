import React from 'react'
import { Container } from '../../layout'
import Outubro from '../../assets/outubro-rosa.png'
import { AppBar, Menu } from '../../components'
import axios from 'axios'

const Home: React.FC = () => {

    const url = 'http://localhost:8083/api/get-all/psicologos'

    function getUser() {
        axios.get(url)
            .then(response => {
                console.log(response)
            })
            .catch(e => console.log(e))
    }

    console.log(getUser())

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

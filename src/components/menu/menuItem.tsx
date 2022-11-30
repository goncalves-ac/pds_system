import { Cyclone } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../layout'

interface MenuItemProps {
    icon: string
    name: string
    isHovering: boolean
    route: string
    datacy: string
}

const MenuItem: React.FC<MenuItemProps> = ({icon, name, isHovering, route, datacy}) => {

    const navigate = useNavigate()
    
    return (
        <div 
            data-cy ={datacy}
            onClick={() => navigate(`/${route}`)}
            style={{display: 'flex', alignItems:'center', marginBottom: '24px', cursor: 'pointer'}}>

            <Container
                width='40px'
                height='40px'
                margin='0 16px'
                justify='center'
                backgroundColor='white'
                borderRadius='25px'
            >
                <Container
                    width='25px'
                    height='25px'
                    backgroundImg={icon}
                />
            </Container>

            {isHovering && 
            <div style={{transition: '0.5s', color: 'white'}}>
                {name}
            </div>}
        </div>
    )
}

export default MenuItem

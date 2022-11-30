import React, { useState } from 'react'
import Agenda from '../../assets/agenda.svg'
import Cadastro from '../../assets/cadastro.svg'
import Cliente from '../../assets/cliente.svg'
import Inicio from '../../assets/inicio.svg'
import Psicologo from '../../assets/psychology.svg'
import Secretaria from '../../assets/secretaria.svg'
import MenuItem from './menuItem'
import './menu.css'

const Menu: React.FC = () => {

    const [isHovering, setIsHovering] = useState(false)

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }
    
    return (
        <div className='menu' 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}
        >
            <MenuItem datacy ={'home'} icon={Inicio} name={'Início'} isHovering={isHovering} route={'home'}/>
            <MenuItem datacy ={'cadastro'} icon={Cadastro} name={'Cadastro'} isHovering={isHovering} route={'cadastro'}/>
            <MenuItem datacy ={'cliente'} icon={Cliente} name={'Cliente'} isHovering={isHovering} route={'cliente'}/>
            <MenuItem datacy ={'psicologo'} icon={Psicologo} name={'Psicólogos'} isHovering={isHovering} route={'psicologo'}/>
            <MenuItem datacy ={'secretaria'} icon={Secretaria} name={'Secretária'} isHovering={isHovering} route={'secretaria'}/>
            <MenuItem datacy ={'agenda'} icon={Agenda} name={'Agenda'} isHovering={isHovering} route={'agenda'}/>
        </div>
    )
}

export default Menu

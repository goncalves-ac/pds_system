import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Container } from '../../layout'
import { AppBar, Menu } from '../../components'
import Box from '@mui/material/Box'
import './agenda.css'

const Agenda: React.FC = () => {

    const [date, setDate] = useState(new Date())

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
                <div>
                    <h1 className='text-center'>Agenda</h1>
                    <div className='calendar-container'>
                        <Calendar onChange={setDate} value={date} />
                    </div>
                    <p className='text-center'>
                        <span className='bold'>Selected Date:</span>{' '}
                        {date.toDateString()}
                    </p>
                </div>
            </Box>
        </Container>
    )
}

export default Agenda

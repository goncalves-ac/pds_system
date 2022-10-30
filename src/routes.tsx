import React from 'react'

import { IRoute } from './dto'
import { Agenda, Home, Login, ResetPassword, Cliente, Secretaria, Psicologo } from './screens'

export const authRoutes: IRoute[] = []

export const notAuthRoutes: IRoute[] = [
    {
        path: '',
        element: <Login />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
    },
    {
        path: 'home',
        element: <Home />
    },
    {
        path: 'cadastro',
        element: <Home />
    },
    {
        path: 'cliente',
        element: <Cliente />
    },
    {
        path: 'psicologo',
        element: <Psicologo />
    },
    {
        path: 'secretaria',
        element: <Secretaria />
    },
    {
        path: 'agenda',
        element: <Agenda />
    },
]
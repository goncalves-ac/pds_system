import React from 'react'

import { IRoute } from './dto'
import { Home, Login, ResetPassword } from './screens'

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
        element: <Home />
    },
    {
        path: 'psicologo',
        element: <Home />
    },
    {
        path: 'secretaria',
        element: <Home />
    },
    {
        path: 'agenda',
        element: <Home />
    },
]
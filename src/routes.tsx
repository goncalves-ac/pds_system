import React from 'react'

import { IRoute } from './dto'
import { Login, ResetPassword } from './screens'

export const authRoutes: IRoute[] = []

export const notAuthRoutes: IRoute[] = [
    {
        path: '',
        element: <Login />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
    }
]
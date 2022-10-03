import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { authRoutes, notAuthRoutes } from './routes'
import { useAuth } from './hooks'

const App: React.FC = () => {
    const { token } = useAuth()

    const routes = useMemo(() => {
        if (token) {
            return authRoutes
        }

        return notAuthRoutes
    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, index) =>
                        <Route key={index} path={`/${route.path}`} element={route.element} />
                    )
                }
            </Routes>
        </BrowserRouter>
    )
}

export default App

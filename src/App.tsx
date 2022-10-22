import React, { useMemo, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { authRoutes, notAuthRoutes } from './routes'
import { useAuth } from './hooks'

import * as firestore from './firestore-services/getters'

const App: React.FC = () => {
    const { token } = useAuth()

    useEffect(() => {
        console.log('Dados de todos os clientes')
        console.log(firestore.getCollectionData('clientes'))
        console.log('Dados de um cliente específico, o Josué')
        console.log(firestore.getDocumentData('clientes','Josué'))
    }, [])

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

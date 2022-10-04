import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { authRoutes, notAuthRoutes } from './routes'
import { useAuth } from './hooks'

// Database related imports
import {db} from './firebase-config'
import {
    collection,
    getDocs,
} from 'firebase/firestore'

// React related imports
import {
    useEffect,
} from 'react'

const App: React.FC = () => {
    const { token } = useAuth()

    // Get a collection/table from the database
    const usersCollectionReference = collection(db, 'users')

    useEffect(() => {
        const getUsers = async () => {
            // Get all documents/rows from the collection passed as reference
            const data = await getDocs(usersCollectionReference)
            console.log(data)
        }

        getUsers()
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

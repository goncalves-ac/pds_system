import React, { useEffect, createContext, useState, useMemo } from 'react'

import {
    IAuthProviderProps,
    IAuthProviderValue
} from '../dto'
import { PersistentService } from '../services'

export const AuthContext = createContext({} as IAuthProviderValue)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        const auth = PersistentService.get('auth')

        if (auth) {
            const persistentToken = auth.token

            if (persistentToken) {
                setToken(persistentToken)
            }
        }
    }, [])

    const providerValue = useMemo(
        () => ({
            token,
            setToken: (newToken?: string) => {
                if (newToken) {
                    setToken(newToken)
                    PersistentService.add('auth', { token: newToken })
                } else {
                    setToken('')
                    PersistentService.remove('auth')
                }
            }
        }),
        [token]
    )

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}

import React from 'react'

export interface IAuthProviderValue {
    token: string
    setToken: (newToken?: string) => void
    // setToken: React.Dispatch<React.SetStateAction<string>>
}

export interface IAuthProviderProps {
    children: React.ReactNode
}
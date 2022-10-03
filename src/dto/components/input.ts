import React from 'react'

import { ContainerProps } from '../layout'

export interface InputComponentProps {
    placeholder?: string
    value: string | number
    fontSize?: string | number
    type?: 'password' | 'text' | 'number'
    textColor?: string
    inputmode?: 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'numeric'
    disabled?: boolean
}

export interface DecoratorsProps {
    decoratorColor?: string
}

export interface InputProps extends
    Omit<ContainerProps, 'children'>,
    InputComponentProps,
    DecoratorsProps {
    icon?: 'search' | 'email' | 'user'
    customIcon?: React.ReactNode
    setValue: (s: string) => void | ((n: number) => void)
}

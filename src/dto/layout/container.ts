import React from 'react'

import { LoaderProps } from '../components'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number

    height?: string | number
    maxHeight?: string | number
    minHeight?: string | number

    fontSize?: string | number
    textColor?: string

    display?: 'flex' | 'block' | 'none'
    scroll?: boolean

    flexDirection?: 'row' | 'column'
    justify?: 'space-between' | 'center' | 'space-around'
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch'
    gap?: string | number
    flex?: number

    borderRadius?: string | number
    borderColor?: string

    boxShaddow?: string

    backgroundColor?: string
    backgroundImg?: string

    position?: 'relative' | 'absolute' | 'fixed'
    top?: string | number
    bottom?: string | number
    left?: string | number
    right?: string | number

    padding?: string | number
    margin?: string | number

    zIndex?: number;

    loading?: LoaderProps & { isLoading?: boolean }
}

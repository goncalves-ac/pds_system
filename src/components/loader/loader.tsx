import React from 'react'

import { Ring } from './styles'
import { LoaderProps } from '../../dto'

const Loader: React.FC<LoaderProps> = (props) => {
    return (
        <Ring {...props}>
            <div />
            <div />
            <div />
            <div />
        </Ring>
    )
}

export default Loader

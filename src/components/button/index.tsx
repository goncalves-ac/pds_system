import React from 'react'

import Loader from '../loader'
import ButtonStyle from './style'
import { ButtonProps } from '../../dto'

const Button: React.FC<ButtonProps> = ({ children, disabled, loading, textColor, ...props }) => {
    return (
        <ButtonStyle
            disabled={disabled || loading}
            textColor={textColor}
            {...props}
        >
            {loading ?
                <Loader
                    size={20}
                    color={textColor ?? '#000'}
                />
                : children
            }
        </ButtonStyle>
    )
}

export default Button

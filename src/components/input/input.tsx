import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { FaKey, FaUser, FaSearch } from 'react-icons/fa'

import { IconContainer, Input as StyledInput, HideContainer } from './style'
import { Container } from '../../layout'
import { InputProps } from '../../dto'

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    fontSize,
    type,
    inputmode,
    icon,
    customIcon,
    setValue,
    disabled,
    decoratorColor,
    borderRadius,
    borderColor,
    height,
    ...containerProps
}) => {
    const [hide, setHide] = useState<boolean>(true)
    const decorators = decoratorColor ? { decoratorColor } : {}

    const getIcon = (): React.ReactNode => {
        switch (icon) {
        case 'email':
            return <MdEmail />

        case 'user':
            return <FaUser />

        default:
            return <FaSearch />
        }
    }

    return (
        <Container
            {...containerProps}
            borderRadius={borderRadius ?? 20}
            borderColor={borderColor ?? '#999999'}
            flexDirection='row'
            position='relative'
            height={height ?? 45}
        >
            {type === 'password' && (
                <IconContainer {...decorators}>
                    <FaKey />
                </IconContainer>
            )}
            {icon && (
                <IconContainer {...decorators}>
                    {getIcon()}
                </IconContainer>
            )}
            {customIcon && (
                <IconContainer {...decorators}>
                    {customIcon}
                </IconContainer>
            )}
            <StyledInput
                type={type === 'password' && !hide ? 'text' : type}
                value={value}
                inputMode={inputmode}
                placeholder={placeholder}
                onClick={e => e.preventDefault()}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                fontSize={fontSize}
            />
            {type === 'password' && (
                <HideContainer {...decorators}>
                    {hide
                        ? <IoMdEye onClick={() => setHide(!hide)} />
                        : <IoMdEyeOff onClick={() => setHide(!hide)} />
                    }
                </HideContainer>
            )}
        </Container>
    )
}

export default Input

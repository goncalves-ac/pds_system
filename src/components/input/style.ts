import styled from 'styled-components'

import { stringOrNumber } from '../../utils'
import { InputComponentProps, DecoratorsProps } from '../../dto/components/input'

export const IconContainer = styled.div<DecoratorsProps>`
    height: 100%;
    flex: 1;
    max-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.decoratorColor ?? '#999999'};
`

export const HideContainer = styled.div<DecoratorsProps>`
    position: absolute;
    right: 10px;
    font-size: 22px;
    color: ${props => props.decoratorColor ?? '#999999'};
`

export const Input = styled.input<InputComponentProps>`
    flex: 9;
    padding: 5px;
    height: 100%;
    border: none;
    background: none;
    font-size: ${props => stringOrNumber(props.fontSize ?? 16)};
    color: ${props => props.textColor ?? '#999999'};

    &:focus {
        outline: none;
    }
`

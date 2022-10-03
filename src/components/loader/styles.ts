import styled, { keyframes } from 'styled-components'

import { LoaderProps } from '../../dto'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Ring = styled.div<LoaderProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    div {
        box-sizing: border-box;
        position: absolute;
        width: ${props => props.size ?? 40}px;
        height: ${props => props.size ?? 40}px;
        margin: ${props => props.size ? props.size / 10 : 4}px;
        border: ${props => props.size ? props.size / 10 : 4}px solid ${props => props.color};
        border-radius: 50%;
        animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props => props.color} transparent transparent transparent;
        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
`

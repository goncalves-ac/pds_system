import styled from 'styled-components'

import { stringOrNumber } from '../../utils'
import { ContainerProps } from '../../dto'

export const Container = styled.div<ContainerProps>`
    width: ${props => stringOrNumber(props.width) ?? '100%'};
    ${props => stringOrNumber(props.maxWidth, 'max-width')}
    ${props => stringOrNumber(props.minWidth, 'min-width')}
    height: ${props => stringOrNumber(props.height) ?? '100%'};
    ${props => stringOrNumber(props.maxHeight, 'max-height')}
    ${props => stringOrNumber(props.minHeight, 'min-height')}
    font-size: ${props => stringOrNumber(props.fontSize ?? 16)};
    ${props => props.textColor ? `color: ${props.textColor};` : ''}
    display: ${props => props.scroll ? 'block' : props.display ?? 'flex'};
    flex-direction: ${props => props.flexDirection ?? 'column'};
    align-items: ${props => props.align ?? 'center'};
    ${props => props.justify ? `justify-content: ${props.justify};` : ''}
    ${props => stringOrNumber(props.gap, 'gap')}
    ${props => props.flex ? `flex: ${props.flex};` : ''}
    ${props => stringOrNumber(props.borderRadius, 'border-radius')}
    ${props => props.borderColor ? `border: 1px solid ${props.borderColor};` : ''}
    ${props => props.backgroundColor ? `background: ${props.backgroundColor};` : ''}
    ${props => props.backgroundImg ? `background: url(${props.backgroundImg});` : ''}
    ${props => props.backgroundImg ? 'background-position: center;' : ''}
    ${props => props.backgroundImg ? 'background-size: cover;' : ''}
    ${props => props.backgroundImg ? 'background-repeat: no-repeat;' : ''}
    overflow-y: ${props => props.scroll && props.flexDirection !== 'row' ? 'scroll' : 'hidden'};
    overflow-x: ${props => props.scroll && props.flexDirection === 'row' ? 'scroll' : 'hidden'};
    ${props => props.boxShaddow ? `box-shadow: ${props.boxShaddow};` : ''}
    ${props => props.position ? `position: ${props.position};` : ''}
    ${props => stringOrNumber(props.bottom, 'bottom')}
    ${props => stringOrNumber(props.top, 'top')}
    ${props => stringOrNumber(props.right, 'right')}
    ${props => stringOrNumber(props.left, 'left')}
    padding: ${props => stringOrNumber(props.padding) ?? '0px'};
    margin: ${props => stringOrNumber(props.margin) ?? '0px'};
    ${props => props.zIndex ? `z-index: ${props.zIndex};` : ''}
    transition: all ease-in .1s;
`
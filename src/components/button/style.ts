import styled from 'styled-components'
import { stringOrNumber } from '../../utils'

import { ButtonProps } from '../../dto/components/button'

const Button = styled.button<ButtonProps>`
  width: ${props => stringOrNumber(props.width) ?? '100%'};
  ${props => stringOrNumber(props.maxWidth, 'max-width')}
  ${props => stringOrNumber(props.minWidth, 'min-width')}

  height: ${props => stringOrNumber(props.height ?? 36)};
  ${props => stringOrNumber(props.maxHeight, 'max-height')}
  ${props => stringOrNumber(props.minHeight, 'min-height')}

  font-size: ${props => stringOrNumber(props.fontSize ?? 16)};
  ${props => props.textColor ? `color: ${props.textColor};` : ''}

  ${props => stringOrNumber(props.borderRadius ?? 20, 'border-radius')}
  ${props => props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''}
  border: ${props => props.border ? `1px solid ${props.border}` : 'none'};

  ${props => props.boxShaddow ? `box-shadow: ${props.boxShaddow};` : ''}

  ${props => stringOrNumber(props.position, 'position')}
  ${props => stringOrNumber(props.bottom, 'bottom')}
  ${props => stringOrNumber(props.top, 'top')}
  ${props => stringOrNumber(props.right, 'right')}
  ${props => stringOrNumber(props.left, 'left')}

  ${props => stringOrNumber(props.zIndex, 'z-index')}

  transition: all ease-in .1s;

  &:hover {
    cursor: pointer;
  }
`

export default Button

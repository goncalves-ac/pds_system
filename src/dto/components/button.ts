export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number

    height?: string | number
    maxHeight?: string | number
    minHeight?: string | number

    fontSize?: string | number
    textColor?: string
    dark?: boolean

    display?: 'block' | 'none'

    borderRadius?: string | number
    border?: string

    boxShaddow?: string

    backgroundColor?: string

    position?: 'relative' | 'absolute' | 'fixed'
    top?: string | number
    bottom?: string | number
    left?: string | number
    right?: string | number

    zIndex?: number;

    disabled?: boolean

    loading?: boolean
}

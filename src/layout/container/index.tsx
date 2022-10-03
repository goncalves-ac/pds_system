import React from 'react'

import { Container as Div } from './styles'
import { ContainerProps } from '../../dto'
import { Loader } from '../../components'

const Container: React.FC<ContainerProps> = ({
    children,
    loading,
    ...props
}) => {
    return (
        <Div {...props}>
            {loading?.isLoading
                ? (
                    <Div justify='center'>
                        <Loader color={loading.color} size={loading.size} />
                    </Div>
                )
                : children
            }
        </Div>
    )
}

export default Container

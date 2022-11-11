import React, { useState } from 'react'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import { Input } from '../../components'
import { Title, Subtitle, Text } from './styles'
import CreateIcon from '@mui/icons-material/Create'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'

interface IUsuarioList {
    titulo: string;
    colunas: string[];
    documentos: object[];
}

export const UsuarioList = ({ titulo, colunas, documentos }: IUsuarioList) => {

    const [pesquisa, setPesquisa] = useState<string>('')

    const ItemLista = (doc: any) => {
        return (
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid silver', gap: '0.5rem' }}>
                <>
                    {Object.values(doc).map((value: any) => {
                        return (
                            <>
                                <Text>{value}</Text>
                            </>
                        )}
                    )}
                    <Box sx={{display: 'flex', justifyContent: 'center', width: '15%'}}>
                        <CreateIcon sx={{marginRight: '2rem'}}/>
                        <TextSnippetIcon />
                    </Box>
                </>
            </Box>
        )
    }

    return (
        <Box
            sx={{ width: '100%', flexDirection: 'column' }}
        >

            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <Title>{titulo}</Title>
                <CloseIcon />
            </Box>
            <Box sx={{ margin: '2rem 0' }}>
                <Input
                    value={pesquisa}
                    setValue={setPesquisa}
                    placeholder='Pesquisar...'
                    width='30%'
                    icon='search'
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    borderTop: '2px solid purple',
                    borderBottom: '2px solid purple',
                    marginBottom: '1rem',
                    gap: '0.5rem',
                }}
            >
                {colunas.map((item, index) => {
                    return (
                        <>
                            <Subtitle key={'coluna' + index}>
                                {item}
                            </Subtitle>
                        </>
                    )
                }
                )}

            </Box>
            <Box>
                {documentos.map((item) => {
                    return (
                        ItemLista(item)
                    )
                })}
            </Box>
        </Box>
    )
}

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const CustomContentWrapper = styled(Box)(({ theme }) => ({
    marginTop: '1rem',
}))

export const CustomBoxFlexEnd = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
}))

export const ButtonWrapper = styled(Box)(({ theme }) => ({
    marginLeft: '1rem',
    marginRight: '1rem',
}))

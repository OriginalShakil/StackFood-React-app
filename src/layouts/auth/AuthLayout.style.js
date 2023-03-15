import { Box, styled } from '@mui/material'
import backgroundImage from '../../assets/images/signin/abstract-office-desktop.png'
import { CenteringSingleComponentOnLayout } from '../../styled-components/CustomStyles.style'

export const AuthLayoutWrapper = styled(CenteringSingleComponentOnLayout)(
    ({ theme }) => ({
        backgroundImage: `url(${backgroundImage})`,
    })
)

export const CustomBoxForAuthLayout = styled(Box)(({ theme }) => ({
    marginTop: '5rem',
}))

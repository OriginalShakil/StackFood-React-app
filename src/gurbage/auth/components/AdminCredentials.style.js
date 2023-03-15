import { Box, styled } from '@mui/material'
import {
    CustomImageContainerWithBorderRadius,
    FlexContainerCol,
    FlexContainerSpaceBetween,
} from '../../../styled-components/CustomStyles.style'
import Typography from '@mui/material/Typography'

export const FlexContainerSpaceBetweenForAdminCredentials = styled(
    FlexContainerSpaceBetween
)(({ theme }) => ({
    width: '100%',
}))
export const FlexContainerColForAdminCredentials = styled(FlexContainerCol)(
    ({ theme }) => ({
        alignItems: 'flex-start',
    })
)

export const CustomTypographyForAdminCredentials = styled(Typography)(
    ({ theme }) => ({
        fontWeight: 'bold',
        textTransform: 'none',
    })
)

export const CustomCopyIconWrapperForAdminCredentials = styled(Box)(
    ({ theme }) => ({
        borderRadius: '0.313rem',
        padding: '0.625rem',
        backgroundColor: '#333F99',
        cursor: 'pointer',
    })
)

export const ImageContainerForAdminCredentials = styled(
    CustomImageContainerWithBorderRadius
)(({ theme }) => ({
    height: '20px',
    width: '20px',
}))

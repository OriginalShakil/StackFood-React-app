import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

export const LandingPageTypography = styled(Typography)(({theme}) => ({
   color: `${theme.palette.mode === 'dark' && '#000'}`

}))
export const LandingPageTypographyWhite = styled(Typography)(({theme}) => ({
   color: `${theme.palette.mode === 'dark' && '#b9b9b9 !important'}`

}))
import { styled } from '@mui/material/styles'
import { CustomDownloadButtonStyled } from '../custom-tables/Tables.style'

export const CustomButtonForDownload = styled(CustomDownloadButtonStyled)(
    ({ theme }) => ({
        '&:hover': {
            backgroundColor: theme.palette.neutral[400],
            color: theme.palette.neutral[200],
        },
    })
)

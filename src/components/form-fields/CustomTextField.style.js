import { styled, TextField } from '@mui/material'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'

export const CustomTextFieldStyle = styled(TextField)(
    ({ theme, borderColor,languageDirection }) => ({
        border: borderColor && `1px solid ${borderColor}`,
        borderRadius: borderColor && '10px',
        backgroundColor: theme.palette.neutral[100],
        '& .MuiOutlinedInput-root': {
            flexDirection:languageDirection && languageDirection==="rtl" ? "row-reverse":"row"
          }

    })
)

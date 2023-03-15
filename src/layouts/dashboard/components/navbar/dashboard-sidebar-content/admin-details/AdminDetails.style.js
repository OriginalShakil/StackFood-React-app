import { Paper, styled } from '@mui/material'
import { FlexContainer } from '../../../../../../styled-components/CustomStyles.style'
import Typography from '@mui/material/Typography'
export const FlexContainerForAdminDetails = styled(FlexContainer)(
    ({ theme }) => ({
        minHeight: '3rem',
        justifyContent: 'flex-start',
        paddingTop: '.7rem',
        paddingBottom: '.7rem',
        //paddingLeft: '10px',
    })
)
export const TextWrapperForAdminDetails = styled(FlexContainer)(
    ({ theme }) => ({
        flexDirection: 'column',
        alignItems: 'flex-start',
    })
)
export const CustomTypographyForAdminDetails = styled(Typography)(
    ({ theme }) => ({
        color: theme.palette.neutral[1000],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textTransform: 'none',
    })
)
export const WrapperForAdminDetails = styled(Paper)(({ theme, open }) => ({
    borderRadius: '10px',
    backgroundColor: theme.palette.neutral[200],
    display: 'flex',
    alignItems: open ? 'inherit' : 'center',
    justifyContent: open ? 'inherit' : 'center',
}))

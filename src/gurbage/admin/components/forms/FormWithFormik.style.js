import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Button, FormControl, Stack, Typography } from '@mui/material'
import { FlexContainerCenter } from '../../../../styled-components/CustomStyles.style'

export const CustomBoxForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingBottom: '0.675rem',
    marginTop: '1rem',
    //fontWeight: 'bolder',
}))
export const CustomFormControlForFormWithFormik = styled(FormControl)(
    ({ theme }) => ({
        marginTop: '1rem',
        marginBottom: '0.5rem',
    })
)

export const DashedBox = styled(Box)(
    ({ theme, width, color, errorStatus }) => ({
        height: '8.75rem',
        width: width?width:'8.75rem',
        border: '1px dashed',
        borderColor: color
            ? 'red'
            : theme.palette.neutral[400] && errorStatus
            ? 'red'
            : theme.palette.neutral[400],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.neutral[400],
        borderRadius: '12px',
        cursor: 'pointer',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    })
)

export const CustomStack = styled(Stack)(({ theme, marginTop }) => ({
    width: '100%',
    marginTop: marginTop && `${marginTop}rem`,
    // marginTop: '1.875rem',
}))

export const CustomButtonForm = styled(Button)(({ theme, primaryButton }) => ({
    width: '6.25rem',
    textTransform: 'uppercase',
    backgroundColor: primaryButton
        ? theme.palette.primary.main
        : theme.palette.neutral[300],
    color: primaryButton
        ? theme.palette.neutral[100]
        : theme.palette.neutral[1000],
    '&:hover': {
        backgroundColor: primaryButton
            ? theme.palette.primary.dark
            : theme.palette.neutral[400],
    },
}))

export const CustomBoxImageText = styled(Box)(({ theme }) => ({
    maxWidth: '14.375rem',
}))

export const CustomTypographyForFormWithFormik = styled(Typography)(
    ({ theme }) => ({
        color: 'red',
    })
)

export const CustomFlexContainerCenter = styled(FlexContainerCenter)(
    ({ theme }) => ({
        marginTop: '1rem',
    })
)

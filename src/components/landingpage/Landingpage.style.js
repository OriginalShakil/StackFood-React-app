import { Button, Paper, styled, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CustomButtonPrimary } from '../../styled-components/CustomButtons.style'

export const CustomBox = styled(Box)(({ theme }) => ({
    maxWidth: '825px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '34px',
    [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
    },
}))
export const CustomSearchField = styled(Paper)(({ theme }) => ({
    width: '100%',
    border: 'none',
}))
export const StyledButton = styled(CustomButtonPrimary)(
    ({ theme, radiuschange, languageDirection }) => ({
        color: theme.palette.whiteContainer.main,
        width: '500px',
        paddingTop: '10px',
        paddingBottom: '9px',
        marginLeft: languageDirection === 'rtl' && '15px',
        borderTopLeftRadius:
            (languageDirection === 'ltr' || !languageDirection) &&
            radiuschange === 'true' &&
            '0px',
        borderBottomLeftRadius:
            (languageDirection === 'ltr' || !languageDirection) &&
            radiuschange === 'true' &&
            '0px',
        borderTopRightRadius:
            languageDirection === 'rtl' && radiuschange === 'true' && '0px',
        borderBottomRightRadius:
            languageDirection === 'rtl' && radiuschange === 'true' && '0px',
    })
)
export const CssTextField = styled(TextField)(
    ({ theme, languageDirection }) => ({
        width: '100%',
        '& label.Mui-focused': {
            color: theme.palette.primary.main,
            background: theme.palette.neutral[100],
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.main,
            background: theme.palette.neutral[100],
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiOutlinedInput-root': {
            paddingTop: '0px',
            paddingBottom: '0px',
            borderTopRightRadius:
                (languageDirection === 'ltr' || !languageDirection) && '0px',
            borderBottomRightRadius:
                (languageDirection === 'ltr' || !languageDirection) && '0px',
            borderTopLeftRadius: languageDirection === 'rtl' && '0px',
            borderBottomLeftRadius: languageDirection === 'rtl' && '0px',
            border: '2px solid',
            borderColor: theme.palette.primary.main,
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
    })
)

export const CustomCardLinkSection = styled(Paper)(({ theme }) => ({
    width: '100%',
    border: 'none',
}))
export const CustomButton = styled(Paper)(({ theme }) => ({
    width: '153px',
    height: '50px',
    borderRadius: '5px',
    overflow: 'hidden',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        width: '120px',
        height: '40px',
    },
}))
export const HeroCardTypography = styled(Typography)(({ theme, subtitle }) => ({
    textAlign: 'center',
    color: theme.palette.whiteContainer.main,
    fontSize: !subtitle && '70px',
    fontStyle: 'Signika Negative',
    fontWeight: 600,
    letterSpacing: '0.05em',
    [theme.breakpoints.down('md')]: {
        fontSize: !subtitle && '50px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: !subtitle && '30px',
    },
}))

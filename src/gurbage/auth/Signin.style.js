import { Alert, Box, Grid, Paper, styled } from '@mui/material'
import {
    CustomImageContainer,
    FlexContainer,
    FlexContainerCenter,
    FlexContainerCol,
    FlexContainerSpaceBetween,
    ImageContainer,
} from '../../styled-components/CustomStyles.style'
import Typography from '@mui/material/Typography'

export const CustomBox = styled(Paper)(({ theme }) => ({
    maxWidth: 825,
    minHeight: 630,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
}))

export const AdminCredentialBox = styled(Box)(({ theme }) => ({
    borderBottomRightRadius: '0.75rem',
    [theme.breakpoints.down('sm')]: {
        borderBottomLeftRadius: '0.75rem',
    },
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    paddingLeft: '20px',
    paddingRight: '15px',
}))

export const CustomGrid = styled(Grid)(({ theme }) => ({
    borderRadius: '20px',
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'inherit',
    },
}))
export const FlexContainerSpaceBetweenForSignIn = styled(
    FlexContainerSpaceBetween
)(({ theme }) => ({
    flexDirection: 'column',
    height: '100%',
}))

export const FlexContainerColForSignIn = styled(FlexContainerCol)(
    ({ theme }) => ({
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        [theme.breakpoints.up('xs')]: {
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '2.5rem',
        },
    })
)
export const CustomLogoContainerSignIn = styled(ImageContainer)(
    ({ theme }) => ({
        width: '10rem',
        height: '5.625rem',
    })
)
export const CustomFormHeadTextContainerSignIn = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: '0.938rem',
    marginBottom: '0.938rem',
}))
export const CustomFlexContainerCenterForSignIn = styled(FlexContainerCenter)(
    ({ theme }) => ({
        marginTop: '1.875rem',
        marginBottom: '1.875rem',
    })
)
export const CustomFormTailContainerForSignIn = styled(Box)(({ theme }) => ({
    width: '100%',
    textAlign: 'center',
}))
export const CustomFlexContainerForSignInLoginServices = styled(FlexContainer)(
    ({ theme }) => ({
        justifyContent: 'center',
        marginTop: '1.3rem',
        marginBottom: '1rem',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    })
)
export const CustomTypographyForSignIn = styled(Typography)(
    ({ theme, coloured, textDecoration, bold }) => ({
        fontWeight: bold ? 'bold' : 'none',
        marginLeft: '0.313rem',
        marginRight: '0.313rem',
        textDecoration: textDecoration ? 'underline' : 'none',
        textTransform: textDecoration ? 'capitalize' : 'none',
        color: coloured
            ? theme.palette.customColor.one
            : theme.palette.neutral[600],
    })
)
export const CustomImageContainerSignIn = styled(CustomImageContainer)(
    ({ theme }) => ({
        '& img': {
            borderTopLeftRadius: '0.75rem',
            borderBottomLeftRadius: '0.75rem',
        },
    })
)

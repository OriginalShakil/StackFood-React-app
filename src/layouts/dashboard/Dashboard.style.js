import { styled } from '@mui/material/styles'
import { AppBar, Stack } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'

export const CustomAppbar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[200],
    // height: '2.5rem',
    display: 'inherit',
    [theme.breakpoints.up('xs')]: {
        marginTop: '4rem',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '3.5rem',
    },
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

export const CustomIconButtonForNavbar = styled(IconButton)(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

export const CustomStackForNavbar = styled(Stack)(({ theme }) => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'inherit',
    },
}))

export const CustomIconsWrapperForNavbar = styled(Stack)(({ theme }) => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
}))

export const CustomColouredTypographyForDashboardNavbarLogo = styled(
    CustomColouredTypography
)(({ theme }) => ({
    color: theme.palette.customColor.one,
    marginLeft: '0.313rem',
    marginRight: '0.313rem',
}))

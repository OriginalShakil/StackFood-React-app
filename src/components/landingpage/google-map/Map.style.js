import { AppBar, styled, Typography } from '@mui/material'

export const LocationView = styled(Typography)(({ theme }) => ({
    flex: '1 0',
    width: '94.5%',
    background: theme.palette.neutral[100],
    color: theme.palette.neutral[1000],
    top: '87px',
    height: '40px',
    padding: '8px',
    margin: '5px',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
        top: '157px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
}))

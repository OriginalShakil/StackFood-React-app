import { styled } from '@mui/material/styles'
import { Box, Button, Grid } from '@mui/material'

export const SaveButton = styled(Button)(({ theme }) => ({
    color: '#ffffff !important',

    [theme.breakpoints.up('xs')]: {
        width: '170px',
        height: '42.04px',
    },
    [theme.breakpoints.up('md')]: {
        width: '170px',
        color: 'black',
    },
}))

export const ButtonBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'center',

    },
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent: 'end',
    },
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'end',
    },
}))
export const CouponCard = styled(Grid)(({ theme }) => ({
    alignItems:'center',
    justify:'center'

}))


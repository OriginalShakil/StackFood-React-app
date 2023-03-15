import { styled } from '@mui/material/styles'
import { Box, Button, Grid, Typography } from '@mui/material'

export const PastButtion = styled(Button)(({ theme, background }) => ({
    borderRadius: '14px',
    // background: 'rgba(239, 120, 34, 0.1)',
    background: background,
    display: 'block',
    [theme.breakpoints.up('xs')]: {
        width: '120.12px',
        height: '84.91px',
    },
    [theme.breakpoints.up('md')]: {
        width: '225px',
        height: '115px',
    },
}))
export const ActiveButtion = styled(Button)(({ theme, background }) => ({
    borderRadius: '14px',

    display: 'block',
    background: background,
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    [theme.breakpoints.up('xs')]: {
        width: '120.12px',
        height: '84.91px',
    },
    [theme.breakpoints.up('md')]: {
        width: '225px',
        height: '115px',
    },
}))
export const TopButtonTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '16px',
    },
}))

export const Image = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        width: '42px',
    },
    [theme.breakpoints.up('md')]: {
        width: '57px',
    },
}))

export const ActiveButtonGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'end',
}))

export const ButtonGrid = styled(Grid)(() => ({
    paddingTop: '30px',
    paddingBottom: '60px',
}))
export const PendingButton = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    textTransform: 'capitalize',
    background: 'rgba(0, 95, 149, 0.1)',
    color: '#005F95',
    borderRadius: '5px',
    padding: '5px',
    width: 'auto',
    [theme.breakpoints.down('md')]: {
        maxWidth: '100px',
        // width: '59.68px',
    },
    [theme.breakpoints.up('xs')]: {
        // width: '59.68px',
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        // width: '88px',
        fontSize: '16px',
    },
}))
export const SuccessButton = styled(Button)(({ theme }) => ({
    background: 'rgba(0, 171, 17, 0.1);',
    color: '#00AB11',
    borderRadius: '5px',
    [theme.breakpoints.up('xs')]: {
        width: '59.68px',
        height: '20.56px',
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        width: '88px',
        height: '30px',
        fontSize: '14px',
    },
}))
export const TrackhButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '32px',
    background: theme.palette.primary.main,
    border: '1px solid rgba(239, 120, 34, 0.3)',
    borderRadius: '5px',
    color: 'white',
    gap: '5px',
    '&:hover': {
        //backgroundColor: alpha(theme.palette.common.white, 0.25),
        backgroundColor: theme.palette.primary.dark,
    },
    //
    // [theme.breakpoints.up('xs')]: {
    //     width: '105.24px',
    //     height: '27.12px',
    //     fontSize: '12px',
    // },
    [theme.breakpoints.up('md')]: {
        width: '150px',
        height: '32px',
        fontSize: '16px',
    },
}))

export const OrderAmountTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '16px',
    },
}))

export const DateTypography = styled(Typography)(({ theme }) => ({
    color: '#9B9B9B',
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '16px',
    },
}))
export const OrderIdTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '22px',
    },
}))

export const ButtonTypography = styled(Typography)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))

export const OrderGrid = styled(Grid)(() => ({
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
    background: '#FFFFFF',
    padding: '10px',
}))

export const OrderBox = styled(Box)(({ theme }) => ({
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
    background: `${theme.palette.mode === 'dark' ? '#000' : '#fff'}`,
    padding: '10px',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    marginBottom: '10px',
}))

export const OrderPegination = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0px 50px 0px',
}))

import { styled, Box, Card } from '@mui/material'

export const WallateBox = styled(Box)(({ theme }) => ({
    height: '123px',
    background: theme.palette.primary.main,
    borderRadius: '10px',
    [theme.breakpoints.up('xs')]: {
        width: '343px',
    },
    [theme.breakpoints.up('md')]: {
        width: '330px',
    },
    // padding:'30px'
}))

export const WalletBoxSection = styled(Box)((theme) => ({
     background: '#FBFBFB',
    borderRadius: '10px',
    padding: '20px',
    marginTop:"2rem"

}))

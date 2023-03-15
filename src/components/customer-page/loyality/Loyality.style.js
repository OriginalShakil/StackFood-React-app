import { styled, Box, Card } from '@mui/material'

export const WallateBox = styled(Box)(() => ({
    maxWidth: '345px',
    height: '176px',
    // background: '#F4F4F4',
    borderRadius: '10px',
    padding: '20px',
}))

export const WalletBoxSection = styled(Card)(() => ({
    paddingTop: '40px',
    background: '#FBFBFB',
    borderRadius: '10px',
    padding: '20px',
}))
export const BoxStyle = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: 24,
   padding:"32px",
  width:"20%",
    // color: '#ffff'
        [theme.breakpoints.down('md')]: {
            width:"80%",
},
}))

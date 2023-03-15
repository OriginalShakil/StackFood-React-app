import {styled} from '@mui/material/styles'
import { Box, Grid, IconButton, Typography,Button, Link, Modal } from '@mui/material';

export const ModalBox = styled(Box)(({theme})=>({
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    bgColor:'background.paper',
    boxShadow:24,
    background:'#FFFFFF',
    borderRadius:'10px',
    padding:'20px',
    maxHeight: 'calc(100vh - 210px)',
    overflowY: 'auto',
    [theme.breakpoints.up('xs')]:{
        width:350
    },
    [theme.breakpoints.up('md')]:{
        width:600
    },



    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     maxWidth:600,
    //     bgcolor: 'background.paper',
    //     // border: '2px solid #000',
    //     boxShadow: 24,
    //     background: '#FFFFFF',
    //     borderRadius: '10px',
    //     p: 2,
    //     maxHeight: 'calc(100vh - 210px)',
    //     overflowY: 'auto'
    // };
}))
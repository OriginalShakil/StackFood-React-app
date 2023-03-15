import { styled } from '@mui/material/styles'
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Modal,
    Typography,
} from '@mui/material'

// export const AddButton = styled(Button)(({ theme }) => ({
//     // color: 'white',
//     // background:'#EF7822',

//     // sx={{background:'#EF7822', color:'white', width:100, height:30}}
//     [theme.breakpoints.up('xs')]: {
//         width: '100px',
//         height: '30.04px',
//     },
//     [theme.breakpoints.up('md')]: {
//         width: '100px',
//         height: '30px',
//     },
// }))

export const ButtonBox = styled(Box)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'end',
    },
}))

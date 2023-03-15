import { styled } from '@mui/material/styles'
import { Box, Grid, Typography, Button } from '@mui/material'

export const WishlistGrid = styled(Grid)(() => ({
    padding: '30px 0px 30px 0px',
}))

export const IconButtonGrid = styled(Grid)(() => ({
    display: 'inline-grid',
    justifyContent: 'flex-end',
    alignItem:"center",

}))
export const WishlistBox = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    boxShadow: ' 0px 0px 10.65px rgba(0, 0, 0, 0.09)',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '20px',

}))
export const ArrowButton = styled(Button)(({theme,languageDirection }) => ({
   color:theme.palette.primary.main,
    // background: 'black',
    borderTopLeftRadius: `${languageDirection === 'rtl' ? '0' : '30px'}`,
    borderTopRightRadius: `${languageDirection === 'rtl' ? '30px' : '0'}`,
    borderBottomLeftRadius: `${languageDirection === 'rtl' ? '12px' : '0'}`,
    borderBottomRightRadius: `${languageDirection === 'rtl' ? '0' : '12px'}`,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
        color:theme.palette.neutral[100],
        backgroundColor: theme.palette.primary.main,
    },

}))

// export const CatagoriName = styled(Box)(() => ({
//     zIndex: 1,
//     position: 'relative',
//     top: '79%',
//     background: 'rgba(0, 0, 0, 0.2)',
//     borderRadius: '0px 0px 5px 5px',
//     color: 'white',
//     display: 'flex',
//     justifyContent: 'center'

// }
// ))

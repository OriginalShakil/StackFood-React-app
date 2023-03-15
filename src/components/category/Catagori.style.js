import { Box, Paper, Stack, styled, Typography } from '@mui/material';
export const CatagoriCardPaper = styled(Paper)(() => ({
    background: '#FFF5CF',
    width: '150px',
    height: '200px',
    borderRadius: '20px'
    //     background-color: #FFF5CF !important;
    //   width: 150px !important;
    //   height: 200px;
    //   border-radius: 20px !important;
}))

export const CatagoriImg = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem'

}))
import { Paper, styled } from '@mui/material'

export const CustomPaper = styled(Paper)(({ theme }) => ({
    width: '700px',
    padding: '10px',
    [theme.breakpoints.down('md')]: {
        width: '500px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '300px',
    },
}))

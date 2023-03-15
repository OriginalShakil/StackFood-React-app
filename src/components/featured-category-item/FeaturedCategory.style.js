import {alpha, Button, Paper, styled} from '@mui/material'

export const CustomColouredPaper = styled(Paper)(({ theme }) => ({
    backgroundColor:alpha(theme.palette.primary.main,.1),
    maxWidth: '120px',
    width: '100%',
    minHeight: '120px',
    height: '100%',
    borderRadius: '20px',
    padding: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        width:"100%",
        borderRadius: '10px',
        minHeight:"40px"
    },
    '&:hover': {
        boxShadow: `0px 0px 10px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
        // color: 'red',
    },
}))

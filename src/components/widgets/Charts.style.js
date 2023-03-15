import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

export const ChartWrapper = styled(Card)(({ theme }) => ({
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    height: '60vh',
    width: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        height: '40vh',
        width: '40vh',
    },
}))

import { Grid, styled, Tabs } from '@mui/material'

export const CustomGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginRight: '-2rem',
    },
}))

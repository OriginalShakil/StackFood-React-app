import { styled } from '@mui/material/styles'
//import { Typography } from '@mui/material'
export const CustomBodyMain = styled('main')(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing.unit,
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
}))
export const CustomBodyContent = styled('div')(({ theme }) => ({
       flexGrow: 1,
       padding: theme.spacing.unit * 3
}))
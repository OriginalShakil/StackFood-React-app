import { styled } from '@mui/material/styles'
import { Box, Grid, Typography } from '@mui/material'

export const OrderDetailGrid = styled(Grid)(() => ({
    background: '#FFFFFF',
    boxShadow:
        '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
    borderRadius: '10px',
    padding: '10px 20px',
}))
export const OrderDetailBox = styled(Box)(() => ({
    paddingTop: '10px',
    paddingBottom: '70px',
}))
export const OrderNumberGrid = styled(Grid)(() => ({
    textAlign: 'center',
}))
export const OrderStatusGrid = styled(Grid)(({ theme }) => ({
    // background: '#FBFBFB',
    background: theme.palette.neutral[200],
    borderRadius: '14px',
    padding: '20px',
    rowGap: '10px',
}))

export const OrderStatusBox = styled(Box)(({ theme, }) => ({
    padding: '7px 0px 20px 0px',
    [theme.breakpoints.up('xs')]: {
        textAlign: 'center',
    },
}))
export const IformationGrid = styled(Grid)(() => ({
    background: 'rgba(239, 120, 34, 0.1)',
    borderRadius: '14px',
    padding: '20px',
    rowGap: '10px',
}))

export const OrderSummaryGrid = styled(Grid)(() => ({
    padding: '20px',
    paddingTop: '25px',
}))
export const OrderSummary = styled(Typography)(() => ({
    textAlign: 'center',
    color: '#4B566B',
    fontSize: '18px',
    fontWeight: '700',
    paddingBottom: '30px',
}))
export const OrderFoodName = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.neutral[1000],
}))
export const OrderFoodAmount = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: '600',
}))
export const CalculationGrid = styled(Grid)(() => ({
    fontSize: '14px',
}))
export const TotalGrid = styled(Grid)(() => ({
    color: '#EF7822',
    fontSize: '16px',
    fontWeight: '600',
}))

export const TitleTypography = styled(Typography)(({ theme,align }) => ({
    fontSize: '18px',
    fontWeight: '700',
    textAlign:align ? align:"",

}))

export const HeadingBox = styled(Box)(() => ({
    padding: '10px 0px 20px 0px',
}))

export const InfoTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '16px',
    },
}))

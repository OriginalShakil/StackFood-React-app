import React, { useEffect } from 'react'
import {
    CustomBoxFullWidth,
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomPaper,
    CustomTypographyAlign,
} from '../../styled-components/CustomStyles.style'
import { Box, Grid, Typography, Stack, Paper } from '@mui/material'
import CustomShimmerForCard from './CustomShimmerForCard'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const CustomShimmerForBestFood = () => {
    const [count, setCount] = React.useState(5)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMd = useMediaQuery(theme.breakpoints.down('lg'))

    useEffect(() => {
        if (isXSmall) {
            setCount(2)
        } else if (isSmall) {
            setCount(3)
        } else setCount(5)
    }, [isXSmall, isSmall, isMd])
    return (
        <>
            {[...Array(count)].map((item) => {
                return (
                    <Grid item md={2.4} sm={4} xs={6}>
                        <CustomShimmerForCard />
                    </Grid>
                )
            })}
        </>
    )
}

export default CustomShimmerForBestFood

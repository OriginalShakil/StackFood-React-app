import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Stack, Paper } from '@mui/material'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'
import {
    CustomCardContent,
    CustomFoodCard,
    FoodSubTitleTypography,
    FoodTitleTypography,
    RatingWrapTypography,
    RatingStarIcon,
    PricingCardActions,
    StyledButton,
} from '../food-card/FoodCard.style'
import Skeleton from '@mui/material/Skeleton'
import CustomShimmerForCard from './CustomShimmerForCard'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const CustomShimmerForCampaigns = ({forrecommend}) => {
    const [count, setCount] = React.useState(4)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMd = useMediaQuery(theme.breakpoints.down('lg'))

    useEffect(() => {
        if (isXSmall) {
            setCount(2)
        } else if (isSmall) {
            setCount(3)
        } else if (isMd) {
            setCount(4)
        }
    }, [isXSmall, isSmall, isMd])
    return (
        <CustomBoxFullWidth mt="10px">
            <Grid container spacing={2}>
                {forrecommend!=="true" &&  <Grid item xs={12} sm={12} md={4} lg={4} display={{xs:"none",md:"block"}}>
                    <Skeleton
                        variant="rounded"
                        animation="pulse"
                        height={285}
                    />
                </Grid>}
                <Grid item xs={12} sm={12} md={8} lg={8} container spacing={2}>
                    <Grid item container md={12} >
                        {[...Array(count)].map((i) => {
                            return <CustomShimmerForCard />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerForCampaigns

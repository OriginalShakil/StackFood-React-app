import React, { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'
import { Box, Grid, Typography, Stack, Paper } from '@mui/material'
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
const CustomShimmerRestaurant = () => {
    const [count, setCount] = useState(10)

    return (
        <CustomBoxFullWidth align="center" >
            <Grid
                container
                spacing={1}
                justifyContent="center"
                paddingTop="30x"
            >
                {[...Array(count)].map((i) => {
                    return (
                        <Grid item lg={1.5} sm={4} xs={6} textAlign="-webkit-center" >
                            <Skeleton variant="rounded" height={120} width={130}/>
                            <Skeleton variant="text" width={130} height={20} />
                            <RatingWrapTypography
                                color="#808080"
                                align="center"
                            >
                                0
                                <RatingStarIcon
                                    fontSize="small"
                                    color="#808080"
                                />
                            </RatingWrapTypography>
                        </Grid>
                    )
                })}
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerRestaurant

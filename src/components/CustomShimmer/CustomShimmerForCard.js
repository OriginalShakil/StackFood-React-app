import React from 'react'
import { Box, Grid, Typography, Stack, Paper, styled } from '@mui/material'
import {
    CustomBoxFullWidth,
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomPaper,
    CustomTypographyAlign,
} from '../../styled-components/CustomStyles.style'
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

const CustomShimmerForCard = () => {
    // const CustomStack = styled(Stack)((theme) => ({
    //     maxWidth: '250px',
    //     width: '100%',
    //     height: '250px',
    // }))
    return (
        <CustomFoodCard>
            <Stack>
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={150}
                />
            </Stack>
            <CustomCardContent>
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}

                />

                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="80%"
                />

                <RatingWrapTypography color="#808080">
                    0
                    <RatingStarIcon fontSize="small" color="#808080" />
                </RatingWrapTypography>
                <PricingCardActions>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={70}
                        height={20}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={70}
                        height={20}
                    />
                </PricingCardActions>
            </CustomCardContent>
        </CustomFoodCard>
    )
}

export default CustomShimmerForCard

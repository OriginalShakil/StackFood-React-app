import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import StarIcon from '@mui/icons-material/Star'
import Skeleton from '@mui/material/Skeleton'
import {
    RatingWrapTypography,
    RatingStarIcon,
} from '../food-card/FoodCard.style'
const CustomResturantShimmer = () => {
    return (
        <Box className="cardpopular">
            <Skeleton
                variant="rounded"
                animation="pluse"
                height={120}
                width={120}
            />
            <Box>
                <Typography>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width={120}
                    />
                </Typography>
                <RatingWrapTypography color="#808080">
                    0
                    <RatingStarIcon fontSize="small" color="#808080" />
                </RatingWrapTypography>
                <Typography mt="20px">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width={150}
                    />
                </Typography>
            </Box>
        </Box>
    )
}

export default CustomResturantShimmer

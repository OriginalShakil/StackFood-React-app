import React, { useEffect, useState } from 'react'
import {Box, CircularProgress, Container, Typography} from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import DiscountBannerSection from './HeadingBannerSection/DiscountBannerSection'
import TopBanner from './HeadingBannerSection/TopBanner'
import RestaurantFoodItems from './foodSection/RestaurantFoodItems'
import discountBanner from '../../assets/images/discount-offer-background.png'

import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import RestaurantShimmer from './RestaurantShimmer/RestaurantShimmer'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import RecommendProduct from "./RecommendProduct";

const RestaurantDetails = ({ restaurantData }) => {
    const router = useRouter()
    const { id } = router.query
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     [`restaurant-details`, id],
    //     () => RestaurantsApi.restaurantDetails(id)
    // )

    return (
        <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
            <CustomStackFullWidth py={isSmall ? 'none' : '1rem'} spacing={4}>
                {restaurantData ? (
                    <TopBanner details={restaurantData} />
                ) : (
                    <>
                        <Box sx={{ display: 'flex' }}>
                            <RestaurantShimmer />
                        </Box>
                    </>
                )}
                <CustomStackFullWidth spacing={4}>
                    {restaurantData?.discount && (
                        <DiscountBannerSection
                            discountBanner={discountBanner}
                            discount={restaurantData}
                        />
                    )}

                        <RecommendProduct  restaurant_id={id}/>
                <CustomPaperBigCard>
                        <RestaurantFoodItems
                            category_ids={restaurantData?.category_ids}
                            restaurant_id={id}
                        />
                </CustomPaperBigCard>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </Container>
    )
}

export default RestaurantDetails

import React from 'react'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Topsection from './Topsection'
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import TopBanner from '../HeadingBannerSection/TopBanner'
import DiscountBannerSection from '../HeadingBannerSection/DiscountBannerSection'
import discountBanner from '../../../assets/images/discount-offer-background.png'
import RestaurantFoodItems from '../foodSection/RestaurantFoodItems'
import RestaurantTopDetail from '../HeadingBannerSection/RestaurantTopDetail'
import Skeleton from '@mui/material/Skeleton'
import { RatingStarIcon, TypographyText } from '../../food-card/FoodCard.style'
import location from '../../../assets/images/icons/location.png'
import Link from 'next/link'
import { getAmount } from '../../../utils/customFunctions'
import favorite from '../../../assets/images/icons/favorite.png'
import DeleteIcon from '@mui/icons-material/Delete'

const RestaurantShimmer = () => {
    return (
        <>
            <Container>
                <CustomStackFullWidth py="2rem" spacing={4}>
                    <CustomPaperBigCard>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height="250px"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3} sm={3} md={3}>
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height="100px"
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Stack>
                                            <Skeleton
                                                variant="text"
                                                width="100px"
                                            />
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={0.5}
                                            >
                                                <Skeleton
                                                    variant="text"
                                                    width="30px"
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="30px"
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                spacing={1}
                                            >
                                                <Skeleton
                                                    variant="text"
                                                    width="120px"
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="20px"
                                                />
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        container
                                        mt="1rem"
                                        spacing={1}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            sm={3}
                                            md={3}
                                            align="center"
                                        >
                                            <Stack
                                                alignItems="center"
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Skeleton
                                                    variant="text"
                                                    width="20px"
                                                    height="30px"
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="50px"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            sm={3}
                                            md={3}
                                            align="center"
                                        >
                                            <Stack alignItems="center">
                                                <Skeleton
                                                    variant="text"
                                                    width="100px"
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="80px"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            sm={3}
                                            md={3}
                                            align="center"
                                        >
                                            <Stack alignItems="center">
                                                <Skeleton
                                                    variant="text"
                                                    width="60px"
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="100px"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            sm={3}
                                            md={3}
                                            align="center"
                                        >
                                            <Skeleton
                                                variant="rectangular"
                                                width="120px"
                                                height="60px"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CustomPaperBigCard>
                    <CustomStackFullWidth spacing={4}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="200px"
                        />
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </Container>
        </>
    )
}
export default RestaurantShimmer

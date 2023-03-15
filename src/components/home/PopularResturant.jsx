import React, { memo } from 'react'
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import RestaurantCard from '../restaurant-details/RestaurantCard'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useRouter } from 'next/router'
import { HomeTitleTypography, PopularRestaurantCard } from './HomeStyle'
import { useTranslation } from 'react-i18next'
import CustomShimmerPopular from '../CustomShimmer/CustomShimmerPopular'
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {onSingleErrorResponse} from "../ErrorResponse";

const PopularResturant = ({data, latestRestaurantData}) => {
    const theme=useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')
    const newtext=t("New On")
    return (
        <>
            <Grid container justifyContent="center"  rowGap={{xs:"10px", md:"0px"}} paddingTop={{xs:"0px",md:"16px"}}>
                <Grid item xs={12} md={6}>
                    <CustomPaperBigCard>
                        <CustomStackFullWidth spacing={3} >
                            <CustomStackFullWidth
                                direction="raw"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography variant={isXSmall ? "h4":"h3"}
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: "1",
                                                width:"300px",
                                                WebkitBoxOrient: "vertical",
                                                [theme.breakpoints.down('sm')]: {
                                                    width:"150px"
                                                }
                                            }}>
                                    {t('Popular Restaurant')}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        router.push('/restaurant/popular')
                                    }
                                    size="small"
                                    sx={{padding:"7px 10px"}}
                                >
                                    <CustomColouredTypography color="primary">
                                        {t('View all')}
                                    </CustomColouredTypography>
                                </Button>
                            </CustomStackFullWidth>
                            <CustomStackFullWidth>
                                {data ? (
                                    <>
                                        {data?.data
                                            ?.slice(0, 4)
                                            ?.map((restaurant) => (
                                                <RestaurantCard
                                                    key={restaurant.id}
                                                    id={restaurant.id}
                                                    image={restaurant?.logo}
                                                    name={restaurant?.name}
                                                    rating={
                                                        restaurant?.avg_rating
                                                    }
                                                    address={
                                                        restaurant?.address
                                                    }
                                                    restaurantImageUrl={
                                                        global?.base_urls
                                                            ?.restaurant_image_url
                                                    }
                                                    restaurantDiscount={restaurant.discount}
                                                    freeDelivery={restaurant.free_delivery}
                                                    active={restaurant.active}
                                                    open={restaurant.open}

                                                />
                                            ))}
                                    </>
                                ) : (
                                    <CustomShimmerPopular />
                                )}
                            </CustomStackFullWidth>
                        </CustomStackFullWidth>
                    </CustomPaperBigCard>
                </Grid>
                <Grid item xs={12} md={6} paddingLeft={{xs:"0px",md:languageDirection==="rtl"? "0px":"16px"}} paddingRight={{xs:"0px",md:languageDirection==="rtl"? "16px":"0px"}}>
                    <CustomPaperBigCard >
                        <CustomStackFullWidth spacing={3} >
                            <CustomStackFullWidth
                                direction="raw"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography variant={isXSmall ? "h4":"h3"}>
                                    {`${newtext} ${global?.business_name} `}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        router.push('/restaurant/latest')
                                    }
                                >
                                    <CustomColouredTypography color="primary">
                                        {t('View all')}
                                    </CustomColouredTypography>
                                </Button>
                            </CustomStackFullWidth>
                            <CustomStackFullWidth>
                                {data ? (
                                    <>
                                        {latestRestaurantData?.data
                                            ?.slice(0, 4)
                                            .map((restaurant) => (
                                                <RestaurantCard
                                                    key={restaurant?.id}
                                                    id={restaurant?.id}
                                                    image={restaurant?.logo}
                                                    name={restaurant?.name}
                                                    rating={
                                                        restaurant?.avg_rating
                                                    }
                                                    address={
                                                        restaurant?.address
                                                    }
                                                    restaurantImageUrl={
                                                        global?.base_urls
                                                            ?.restaurant_image_url
                                                    }
                                                    discount={
                                                        restaurant.discount
                                                            ?.discount
                                                    }
                                                    restaurantDiscount={restaurant.discount}
                                                    freeDelivery={restaurant.free_delivery}
                                                    active={restaurant.active}
                                                    open={restaurant.open}
                                                />
                                            ))}
                                    </>
                                ) : (
                                    <CustomShimmerPopular />
                                )}
                            </CustomStackFullWidth>
                        </CustomStackFullWidth>
                    </CustomPaperBigCard>
                </Grid>
            </Grid>
        </>
    )
}

export default memo(PopularResturant)

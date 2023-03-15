import React, { memo, useRef } from 'react'
import Slider from 'react-slick'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Paper from '@mui/material/Paper'

import popularnearby from '../../../../public/static/popularResturant/image 19.png'
import FoodCard from '../../food-card/FoodCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { PopularFoodNearbyApi } from '../../../hooks/react-query/config/productsApi'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import FoodCardMoreButton from '../../food-card/FoodCardMoreButton'
import { AllRoutes } from '../../../AllRoutes'
import { useTranslation } from 'react-i18next'
import { LeftArrowStyle, RightArrowStyle } from '../HomeStyle'
import CustomShimmerForCampaigns from '../../CustomShimmer/CustomShimmerForCampaigns'
import CustomImageContainer from '../../CustomImageContainer'
import { CustomTypography } from '../../custom-tables/Tables.style'
import {
    CustomBoxAbsoluteCenter,
    CustomBoxRelative,
    CustomColouredTypography, CustomStackFullWidth, SliderCustom,
} from '../../../styled-components/CustomStyles.style'
import feature7 from '../../../../public/static/featurecatagori/image 17.png'
import { CustomIconButton } from '../food-campaign/FoodCampaign.style'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { settings } from './SliderSettings'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {foodCount} from "../../../utils/customFunctions";

const NearbyPopularFood = ({data, isLoading}) => {
    const { t } = useTranslation()
    const popularFoodRef = useRef(null)

    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.up('sm'))
    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     ['popular-food'],
    //     PopularFoodNearbyApi.popularFood
    // )
    const languageDirection = localStorage.getItem('direction')
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CustomShimmerForCampaigns />
            </Box>
        )
    }
    const limit = 5
    return (
        <>
            <Grid container spacing={{ xs: 1, md: 1, lg: 1 }}>
                {isSmall ? (
                    <Grid item xs={12} md={3} sm={12} lg={3}>
                        <CustomTypography variant="h3" fontWeight="700">
                            {t('Popular Foods Nearby')}
                        </CustomTypography>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={3} sm={12} lg={3}>
                        <CustomBoxRelative height="306px">
                            <CustomImageContainer
                                src={popularnearby.src}
                                alt=""
                                borderRadius=".7rem"
                            />
                            <CustomBoxAbsoluteCenter>
                                <Typography
                                    fontSize="2.3rem"
                                    fontWeight="700"
                                    lineHeight="40px"
                                    color={theme.palette.error.whiteText}
                                >
                                    {t('Popular Food')} <br /> {t('Nearby')}
                                </Typography>
                            </CustomBoxAbsoluteCenter>
                        </CustomBoxRelative>
                    </Grid>
                )}
                <Grid item xs={12} md={9} sm={12} lg={9}>
                    <Grid item container md={12} position="relative">
                        <CustomStackFullWidth justifyContent="right">
                        {isMedium && data?.data?.total_size > 3 && (
                            <LeftArrowStyle
                                languageDirection={languageDirection}
                                left="3%"
                            >
                                <CustomIconButton
                                    onClick={() =>
                                        popularFoodRef.current.slickPrev()
                                    }
                                >
                                    <ArrowBackIosNewIcon fontSize="small" />
                                </CustomIconButton>
                            </LeftArrowStyle>
                        )}
                        {isSmall && data?.data?.total_size > 2 && (
                            <LeftArrowStyle
                                left="3%"
                                languageDirection={languageDirection}
                            >
                                <CustomIconButton
                                    onClick={() =>
                                        popularFoodRef.current.slickPrev()
                                    }
                                >
                                    <ArrowBackIosNewIcon fontSize="small" />
                                </CustomIconButton>
                            </LeftArrowStyle>
                        )}

                        {isMedium && data?.data?.total_size > 3 && (
                            <RightArrowStyle
                                right="3%"
                                languageDirection={languageDirection}
                            >
                                <CustomIconButton
                                    nextbutton="false"
                                    onClick={() =>
                                        popularFoodRef.current.slickNext()
                                    }
                                >
                                    <ArrowForwardIosIcon fontSize="small" />
                                </CustomIconButton>
                            </RightArrowStyle>
                        )}
                        {isSmall && data?.data?.total_size > 2 && (
                            <RightArrowStyle
                                right="3%"
                                languageDirection={languageDirection}
                            >
                                <CustomIconButton
                                    nextbutton="false"
                                    onClick={() =>
                                        popularFoodRef.current.slickNext()
                                    }
                                >
                                    <ArrowForwardIosIcon fontSize="small" />
                                </CustomIconButton>
                            </RightArrowStyle>
                        )}
                        <SliderCustom languageDirection={languageDirection} >
                        <Slider ref={popularFoodRef} {...settings}>
                            {data?.data?.total_size > limit && languageDirection==="rtl"  &&(
                                <FoodCardMoreButton
                                    moreData={data?.data?.total_size - limit}
                                    route={AllRoutes.POPULAR_PRODUCTS}
                                />
                            )}
                            {data?.data?.products
                                ?.slice(0, limit)
                                .map((product) =>{
                                    if(product?.variations === null || product?.variations[0]?.values || product?.variations?.length === 0){
                                        return (
                                            <FoodCard
                                                key={product?.id}
                                                product={product}
                                                productImageUrl={
                                                    global?.base_urls?.product_image_url
                                                }
                                            />
                                        )
                                    }

                                })}
                            {data?.data?.total_size > limit && languageDirection !=="rtl"  &&  (
                                <FoodCardMoreButton
                                    moreData={foodCount(data?.data?.products) - limit}
                                    route={AllRoutes.POPULAR_PRODUCTS}
                                />
                            )}
                        </Slider>
                            </SliderCustom>
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default memo(NearbyPopularFood)

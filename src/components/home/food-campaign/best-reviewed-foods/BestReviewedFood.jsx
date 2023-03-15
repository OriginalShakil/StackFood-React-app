import React, { memo, useRef } from 'react'
import Slider from 'react-slick'
import Box from '@mui/material/Box'
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FoodCard from '../../../food-card/FoodCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { MostReviewedApi } from '../../../../hooks/react-query/config/productsApi'
import { useRouter } from 'next/router'
import { AllRoutes } from '../../../../AllRoutes'
import {
    HomeTitleTypography,
    LeftArrowStyle,
    RightArrowStyle,
} from '../../HomeStyle'
import { useTranslation } from 'react-i18next'
import CustomShimmerForBestFood from '../../../CustomShimmer/CustomShimmerForBestFood'
import {
    CustomStackFullWidth,
    CustomViewAll,
    SliderCustom,
} from '../../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../../custom-tables/Tables.style'
import FeaturedCategoryCard from '../../../featured-category-item/FeaturedCategoryCard'
import CustomShimmerCategories from '../../../CustomShimmer/CustomShimmerCategories'
import { CustomIconButton } from '../FoodCampaign.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { settings } from './SliderSetting'
import { onSingleErrorResponse } from '../../../ErrorResponse'

const BestReviewedFood = ({ data }) => {
    const { t } = useTranslation()
    const bestfoodslideRef = useRef(null)
    const foodCampaignSliderRef = useRef(null)
    const router = useRouter()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.up('sm'))

    const { global } = useSelector((state) => state.globalSettings)
    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     ['most-review-product'],
    //     MostReviewedApi.reviewed,
    //     {
    //         onError: onSingleErrorResponse,
    //     }
    // )

    // if (isError) {
    //     return <h1>{error.messages}</h1>
    // }
    const languageDirection = localStorage.getItem('direction')
    const HandleNext = ({ onClick, className }) => (
        <>
            {isMedium && data?.data?.products?.length > 4 && (
                <RightArrowStyle
                    right="1%"
                    languageDirection={languageDirection}
                    isdisabled={className?.includes('slick-disabled')}
                >
                    <CustomIconButton nextbutton="true" onClick={onClick}>
                        <ArrowForwardIcon />
                    </CustomIconButton>
                </RightArrowStyle>
            )}
            {isSmall && data?.data?.products?.length > 4 && (
                <RightArrowStyle
                    right="1%"
                    languageDirection={languageDirection}
                >
                    <CustomIconButton
                        nextbutton="true"
                        onClick={() =>
                            foodCampaignSliderRef.current.slickNext()
                        }
                    >
                        <ArrowForwardIcon />
                    </CustomIconButton>
                </RightArrowStyle>
            )}
        </>
    )
    const HandlePrev = ({ onClick, className }) => (
        <>
            {isMedium && data?.data?.products?.length > 4 && (
                <LeftArrowStyle
                    languageDirection={languageDirection}
                    left="1%"
                    isdisabled={className?.includes('slick-disabled')}
                >
                    <CustomIconButton nextbutton="true" onClick={onClick}>
                        <ArrowBackIcon
                            sx={{
                                color: (theme) => theme.palette.neutral[100],
                            }}
                        />
                    </CustomIconButton>
                </LeftArrowStyle>
            )}
            {isSmall && data?.data?.products?.length > 4 && (
                <LeftArrowStyle
                    left="1%"
                    languageDirection={languageDirection}
                    isdisabled={className?.includes('slick-disabled')}
                >
                    <CustomIconButton nextbutton="true" onClick={onClick}>
                        <ArrowBackIcon
                            sx={{
                                color: (theme) => theme.palette.neutral[100],
                            }}
                        />
                    </CustomIconButton>
                </LeftArrowStyle>
            )}
        </>
    )
    const settings = {
        speed: 500,
        slidesToShow: 5.5,
        slidesToScroll: 3,
        initialSlide: 0,
        infinite: false,
        nextArrow: <HandleNext />,
        prevArrow: <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5.5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,

                    // dots: true
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // initialSlide: 2

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,

                    // dots: true
                    initialSlide: 0,
                },
            },
        ],
    }

    return (
        <Grid container spacing={{ xs: 0, md: 1 }}>
            <Grid item xs={12} md={12}>
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="0px 8px"
                >
                    <Typography
                        variant="h3"
                        color={theme.palette.neutral[1000]}
                        fontWeight="700"
                    >
                        {t('Best Reviewed Foods')}
                    </Typography>
                    <CustomViewAll
                        onClick={() => router.push(AllRoutes.REVIEWED_PRODUCTS)}
                    >
                        {t('View all')}
                    </CustomViewAll>
                </CustomStackFullWidth>
            </Grid>
            <Grid item xs={12} md={12} mt="1rem">
                {data ? (
                    <Grid
                        container
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        position="relative"
                    >
                        <CustomStackFullWidth justifyContent="right">
                            <SliderCustom
                                languageDirection={languageDirection}
                                py=".5rem"
                            >
                                <Slider
                                    ref={foodCampaignSliderRef}
                                    {...settings}
                                >
                                    {data?.data?.products
                                        .slice(0, 10)
                                        .map((product) => {
                                            if(product?.variations === null || product?.variations[0]?.values || product?.variations?.length === 0){
                                                return(
                                                    <Stack
                                                        width="100%"
                                                        height="100%"
                                                        marginBottom={{
                                                            xs: '0px',
                                                            md: '10px',
                                                        }}
                                                    >
                                                        <FoodCard
                                                            key={product?.id}
                                                            product={product}
                                                            global={global}
                                                            productImageUrl={
                                                                global?.base_urls
                                                                    ?.product_image_url
                                                            }
                                                        />
                                                    </Stack>
                                                )
                                            }
                                        })}
                                </Slider>
                            </SliderCustom>
                        </CustomStackFullWidth>
                    </Grid>
                ) : (
                    <Grid container item lg={12} md={12} xs={12}>
                        <CustomShimmerForBestFood />{' '}
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default memo(BestReviewedFood)

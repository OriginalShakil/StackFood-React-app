import React, { memo, useRef } from 'react'
import Slider from 'react-slick'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'

import feature7 from '../../../../public/static/featurecatagori/image 17.png'
import FoodCard from '../../food-card/FoodCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useQuery } from 'react-query'
import { CampaignApi } from '../../../hooks/react-query/config/campaignApi'
import { LeftArrowStyle, RightArrowStyle } from '../HomeStyle'
import FoodCardMoreButton from '../../food-card/FoodCardMoreButton'
import { useTranslation } from 'react-i18next'
import CustomShimmerForCampaigns from '../../CustomShimmer/CustomShimmerForCampaigns'
import { AllRoutes } from '../../../AllRoutes'
import {
    CustomBoxAbsoluteCenter,
    CustomBoxRelative, CustomSliderTest, CustomStackFullWidth,
    CustomViewAll, SliderCustom,
} from '../../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'
import CustomImageContainer from '../../CustomImageContainer'
import popularnearby from '../../../../public/static/popularResturant/image 19.png'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { CustomIconButton } from './FoodCampaign.style'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { settings } from './SliderSettings'
import {onSingleErrorResponse} from "../../ErrorResponse";
import {foodCount} from "../../../utils/customFunctions";
//import SliderCustom from "../../custom-slider/SliderCustom";
const FoodCampaign = ({data}) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.up('sm'))

    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     ['campaign'],
    //     CampaignApi.campaign,{
    //         onError:onSingleErrorResponse
    //     }
    //
    // )

    const foodCampaignSliderRef = useRef(null)

    const languageDirection = localStorage.getItem('direction')
    // ) : (
    //         <CustomShimmerForCampaigns />
    //     )}
    // {data ? (
    if (!data) {
        return <CustomShimmerForCampaigns />
    }
    const limit = 5
    return (
        <>
            <Grid container spacing={{ xs: 1, md: 1, lg: 1 }} justifyContent="left" alignItems="center">
                {isSmall ? (
                    <Grid item xs={12} md={3} sm={12} lg={3}>
                        <CustomTypography variant="h3" fontWeight="700">
                            {t('Campaigns')}
                        </CustomTypography>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={3} sm={12} lg={3}>
                        <CustomBoxRelative height="306px">
                            <CustomImageContainer
                                src={feature7.src}
                                alt="Campaigns-imag"
                                height="100%"
                                borderRadius=".7rem"
                            />
                            <CustomBoxAbsoluteCenter>
                                <Typography
                                    fontSize="2rem"
                                    fontWeight="700"
                                    lineHeight="40px"
                                >
                                    {t('Food')} <br /> {t('Campaigns')}
                                </Typography>
                            </CustomBoxAbsoluteCenter>
                        </CustomBoxRelative>
                    </Grid>
                )}
                <Grid item xs={12} md={9} sm={12} lg={9} >
                    <Grid item container md={12} position="relative">
                       <CustomStackFullWidth justifyContent="right">
                           {isMedium && data?.data?.length > 3 && (
                               <LeftArrowStyle
                                   languageDirection={languageDirection}
                                   left="3%"
                               >
                                   <CustomIconButton
                                       onClick={() =>
                                           foodCampaignSliderRef.current.slickPrev()
                                       }
                                   >
                                       <ArrowBackIosNewIcon fontSize="small" />
                                   </CustomIconButton>
                               </LeftArrowStyle>
                           )}
                           {isSmall && data?.data?.length > 2 && (
                               <LeftArrowStyle
                                   languageDirection={languageDirection}
                                   left="3%"
                               >
                                   <CustomIconButton
                                       onClick={() =>
                                           foodCampaignSliderRef.current.slickPrev()
                                       }
                                   >
                                       <ArrowBackIosNewIcon fontSize="small" />
                                   </CustomIconButton>
                               </LeftArrowStyle>
                           )}

                           {isMedium && data?.data?.length > 3 && (
                               <RightArrowStyle
                                   languageDirection={languageDirection}
                                   right="3%"
                               >
                                   <CustomIconButton
                                       nextbutton="false"
                                       onClick={() =>
                                           foodCampaignSliderRef.current.slickNext()
                                       }
                                   >
                                       <ArrowForwardIosIcon fontSize="small" />
                                   </CustomIconButton>
                               </RightArrowStyle>
                           )}
                           {isSmall && data?.data?.length > 2 && (
                               <RightArrowStyle
                                   languageDirection={languageDirection}
                                   right="3%"
                               >
                                   <CustomIconButton
                                       nextbutton="false"
                                       onClick={() =>
                                           foodCampaignSliderRef.current.slickNext()
                                       }
                                   >
                                       <ArrowForwardIosIcon fontSize="small" />
                                   </CustomIconButton>
                               </RightArrowStyle>
                           )}

                          <SliderCustom languageDirection={languageDirection}>
                              <Slider ref={foodCampaignSliderRef} {...settings} >
                                  {data?.data?.slice?.(0, limit).map((product) => {
                                      if(product?.variations === null || product?.variations[0]?.values || product?.variations?.length === 0){
                                          return(
                                              <FoodCard
                                                  key={product?.id}
                                                  product={product}
                                                  productImageUrl={
                                                      global?.base_urls?.campaign_image_url
                                                  }
                                              />
                                          )
                                      }
                                  })}
                                  {foodCount(data?.data) > limit && (
                                      <FoodCardMoreButton route="/campaigns" />
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

export default memo(FoodCampaign)

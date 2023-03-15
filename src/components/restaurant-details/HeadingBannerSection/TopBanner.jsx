import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import RestaurantTopDetail from './RestaurantTopDetail'
import { CustomGrid } from './Topbanner.style'
import free from '../../../../public/static/frre.png'
import { styled, useTheme } from '@mui/material/styles'
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomImageContainer from '../../CustomImageContainer'
import { restaurantDiscountTag } from '../../../utils/customFunctions'
import { t } from 'i18next'

const StyledImageBox = styled(Box)(({ theme, height, objectfit }) => ({
    height: height,
    width: '100%',
    borderRadius: '0.125rem',
    position: 'relative',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: objectfit ? objectfit : 'contained',
    },
}))
const TopBanner = ({ details }) => {
    const { global } = useSelector((state) => state.globalSettings)

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const restaurantCoverUrl = global?.base_urls?.restaurant_cover_photo_url
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const freeDelivery = details?.free_delivery
    const restaurantDiscount = details.discount
    return (
        <CustomPaperBigCard nopadding={isXSmall && 'true'}>
            <Grid container spacing={{xs:2,md:3}}>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <CustomImageContainer
                        src={`${restaurantCoverUrl}/${details.cover_photo}`}
                        height="220px"
                        objectfit={isXSmall ? 'contained' : 'cover'}
                        borderRadius=".7rem"
                    />
                    {/*<StyledImageBox*/}
                    {/*    height="220px"*/}
                    {/*    objectfit={isXSmall ? 'contained' : 'cover'}*/}
                    {/*>*/}
                    {/*    <img*/}
                    {/*        src={`${restaurantCoverUrl}/${details.cover_photo}`}*/}
                    {/*        alt="restaurant image"*/}
                    {/*    />*/}
                    {/*</StyledImageBox>*/}
                    {restaurantDiscountTag(
                        restaurantDiscount,
                        freeDelivery
                    ) && (
                        <Stack
                            sx={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '15px',
                                width: '138px',
                                height: '71px',
                                background: (theme) =>
                                    theme.palette.neutral[100],
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                            }}
                        >
                            {restaurantDiscountTag(
                                restaurantDiscount,
                                freeDelivery
                            ) === 'Free Delivery' ? (
                                <>
                                    <CustomImageContainer
                                        width="44px"
                                        height="44px"
                                        objectFit="contained"
                                        src={free.src}
                                    />
                                    <CustomColouredTypography variant="h4">
                                        {t('Delivery')}
                                    </CustomColouredTypography>
                                </>
                            ) : (
                                <CustomColouredTypography variant="h3">
                                    {restaurantDiscountTag(
                                        restaurantDiscount,
                                        freeDelivery,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </CustomColouredTypography>
                            )}
                        </Stack>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomStackFullWidth
                        pl={isXSmall && '1rem'}
                        pr={isXSmall && '1.875rem'}
                        pb={isXSmall && '1.875rem'}
                    >
                        <RestaurantTopDetail {...details} />
                    </CustomStackFullWidth>
                </Grid>
            </Grid>
        </CustomPaperBigCard>
    )
}

export default TopBanner

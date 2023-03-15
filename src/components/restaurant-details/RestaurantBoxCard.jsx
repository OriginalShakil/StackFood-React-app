import {alpha, Grid, Stack, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React, {useEffect, useState} from 'react'
import StarIcon from '@mui/icons-material/Star'
import Link from 'next/link'
import { HomeTextTypography } from '../home/HomeStyle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { NewTypography, OfferTypography } from '../food-card/FoodCard.style'
import {
    getAmount,
    getDiscountForTag,
    restaurantDiscountTag,
} from '../../utils/customFunctions'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import placeholder from "../../../public/static/no-image-found.png";

const RestaurantBoxCard = ({
    restaurantImageUrl,
    freeDelivery,
    image,
    name,
    rating,
    id,
    active,
    open,
    restaurantDiscount,
}) => {
    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    const [imageFile, setState]= useState(null)

    // const restaurantDiscountTag = () => {
    //     if (restaurantDiscount?.discount_type === 'percent') {
    //         return (
    //             <NewTypography>
    //                 {getDiscountForTag(restaurantDiscount)} {t("% off")}
    //             </NewTypography>
    //         )
    //     } else if (restaurantDiscount?.discount_type === 'amount') {
    //         return (
    //             <NewTypography>
    //                 {getAmount(restaurantDiscount.discount)}
    //             </NewTypography>
    //         )
    //     } else if (freeDelivery) {
    //         return <NewTypography>{t('Free Delivery')}</NewTypography>
    //     } else return null
    // }
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const logo = `${restaurantImageUrl}/${image}`
    useEffect(()=>{
        setState(logo)
    },[logo])
    const theme = useTheme()
    const restaurantCloseHandler = () => {
        if (active) {
            if (open === 0) {
                return (
                    <Stack
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: (theme) =>
                                theme.palette.primary.overLay,
                            opacity: '0.7',
                            color: 'white',
                            padding: '10px',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" align="center" color={theme.palette.neutral[100]}>
                            {t('Closed Now')}
                        </Typography>
                    </Stack>
                )
            }
        } else {
            return (
                <Stack
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: (theme) => theme.palette.primary.overLay,
                        opacity: '0.5',
                        color: 'white',
                        padding: '10px',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4" align="center" color={theme.palette.neutral[100]}>
                        {t('Closed Now')}
                    </Typography>
                </Stack>
            )
        }
    }
    return (
        <>
            <Link href={`/restaurant/${id}`} passHref>
                <Box
                    sx={{
                        textAlign: 'center',
                        cursor: 'pointer',
                        width:"100%",
                        '&:hover': {
                            boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
                            // color: 'red',
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            border:`1px solid ${alpha(theme.palette.primary.main,0.5)}`,
                            borderRadius: '5px',
                        }}
                    >
                        {restaurantCloseHandler()}
                        {restaurantDiscountTag(
                            restaurantDiscount,
                            freeDelivery
                        ) && (
                            <NewTypography

                            >
                                {restaurantDiscountTag(
                                    restaurantDiscount,
                                    freeDelivery,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </NewTypography>
                        )}

                        <img className="resturant__img" src={imageFile} alt="logo" width="100%" height="153px"
                             onError={() => {
                                 // currentTarget.onerror = null; // prevents looping
                                 setState(placeholder.src)}}
                        />
                    </Box>
                    <Box>
                        <HomeTextTypography>{name}</HomeTextTypography>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                color: (theme) => theme.palette.neutral[1000],
                            }}
                        >
                            {rating?.toFixed(1)}
                            {'  '}
                            <StarIcon
                                sx={{
                                    width: '16px',
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            />
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </>
    )
}

export default RestaurantBoxCard

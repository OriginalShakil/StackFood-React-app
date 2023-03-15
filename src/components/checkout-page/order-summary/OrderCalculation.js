import React, { useEffect, useState } from 'react'
import { Grid, Stack, Box, Typography } from '@mui/material'
import {
    getAmount,
    getCalculatedTotal,
    getCouponDiscount,
    getDeliveryFees,
    getProductDiscount,
    getSubTotalPrice,
    getTaxableTotalPrice, maxCodAmount,
} from '../../../utils/customFunctions'
import { CalculationGrid, TotalGrid } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCouponType } from '../../../redux/slices/global'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CustomDivider from '../../CustomDivider'
import { setTotalAmount } from '../../../redux/slices/cart'
import useGetVehicleCharge from "../../../hooks/react-query/config/useGetVehicleCharge";


const OrderCalculation = (props) => {
    const {
        cartList,
        restaurantData,
        couponDiscount,
        taxAmount,
        distanceData,
        total_order_amount,
        global,
        orderType,
        couponInfo,
        deliveryTip,
        origin,
        destination,
        extraCharge
    } = props
    const { couponType, zoneData } = useSelector(
        (state) => state.globalSettings
    )
    const { t } = useTranslation()
    const [freeDelivery, setFreeDelivery] = useState('false')
    const theme = useTheme()

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }



    const languageDirection = localStorage.getItem('direction')
    const handleDeliveryFee = () => {
        let price = getDeliveryFees(
            restaurantData,
            global,
            cartList,
            distanceData?.data,
            couponDiscount,
            couponType,
            orderType,
            zoneData,
            origin,
            destination,
             extraCharge
        )

        if (price === 0) {
            return <Typography variant="h4">{t('Free')}</Typography>
        } else {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.5}
                    width="100%"
                >
                    <Typography variant="h4">{'(+)'}</Typography>
                    <Typography variant="h4">
                        {restaurantData &&
                            getAmount(
                                price,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                    </Typography>
                </Stack>
            )
        }
    }
    const handleCouponDiscount = () => {
        let couponDiscountValue = getCouponDiscount(
            couponDiscount,
            restaurantData,
            cartList
        )
        if (couponDiscount && couponDiscount.coupon_type === 'free_delivery') {
            setFreeDelivery('true')
            return 0
        } else {
            let discount = getAmount(
                couponDiscountValue,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
            return discount
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCouponType(''))
    }, [])

    const handleOrderAmount = () => {
        let totalAmount = getCalculatedTotal(
            cartList,
            couponDiscount,
            restaurantData,
            global,
            distanceData,
            couponType,
            orderType,
            freeDelivery,
            deliveryTip,
            zoneData,
            origin,
            destination,
             extraCharge
        )
        dispatch(setTotalAmount(totalAmount))
        return getAmount(
            totalAmount,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    }
    const vat=t("VAT/TAX")
    const include=t("(include)")
    return (
        <>
            <CalculationGrid container item md={12} xs={12} spacing={1}>
                <Grid item md={8} xs={8}>
                    {t('Subtotal')}
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={4}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                >
                    <Typography variant="h4">
                        {getAmount(
                            getSubTotalPrice(cartList),
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    {t('Discount')}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={0.5}
                    >
                        <Typography variant="h4">{'(-)'}</Typography>
                        <Typography variant="h4">
                            {restaurantData &&
                                getAmount(
                                    getProductDiscount(
                                        cartList,
                                        restaurantData
                                    ),
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                        </Typography>
                    </Stack>
                </Grid>
                {couponDiscount && (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Coupon Discount')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            {couponDiscount.coupon_type === 'free_delivery' ? (
                                <p>{t('Free Delivery')}</p>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {'(-)'}
                                    </Typography>
                                    <Typography variant="h4">
                                        {restaurantData &&
                                            cartList &&
                                            handleCouponDiscount()}
                                    </Typography>
                                </Stack>
                            )}
                        </Grid>
                    </>
                )}
                {restaurantData &&
                    restaurantData?.data &&
                    restaurantData?.data?.tax && (
                        <>
                            <Grid item md={8} xs={8}>
                                {t(`${vat}${global?.tax_included===1? include:""}`)}({restaurantData?.data?.tax}
                                %)
                            </Grid>
                            <Grid item md={4} xs={4} align="right">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {global?.tax_included===1?"":"(+)" }

                                    </Typography>
                                    <Typography variant="h4">
                                        {restaurantData &&
                                            getAmount(
                                                getTaxableTotalPrice(
                                                    cartList,
                                                    couponDiscount,
                                                    restaurantData
                                                ),
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </>
                    )}
                {Number.parseInt(global?.dm_tips_status) === 1 && (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Deliveryman tips')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography variant="h4">{'(+)'}</Typography>
                                <Typography variant="h4">
                                    {getAmount(
                                        deliveryTip,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                )}

                <Grid item md={8} xs={8}>
                    {t('Delivery fee')}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    {couponDiscount ? (
                        couponDiscount?.coupon_type === 'free_delivery' ? (
                            <p>{t('Free')}</p>
                        ) : (
                            restaurantData && handleDeliveryFee()
                        )
                    ) : (
                        restaurantData && handleDeliveryFee()
                    )}
                </Grid>
                <CustomDivider />
                <TotalGrid container md={12} xs={12} mt="1rem">
                    <Grid item md={8} xs={8} pl=".5rem">
                        <Typography color={theme.palette.primary.main}>
                            {' '}
                            {t('Total')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        xs={4}
                        align={languageDirection === 'rtl' ? 'left' : 'right'}
                    >
                        <Typography color={theme.palette.primary.main}>
                            {restaurantData && cartList && handleOrderAmount()}
                        </Typography>
                    </Grid>
                </TotalGrid>
            </CalculationGrid>
        </>
    )
}

OrderCalculation.propTypes = {}

export default OrderCalculation

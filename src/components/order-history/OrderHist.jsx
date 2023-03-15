import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import Link from 'next/link'

import {
    ButtonTypography,
    DateTypography,
    OrderAmountTypography,
    OrderBox,
    OrderIdTypography,
    PendingButton,
    SuccessButton,
    TrackhButton,
} from './OrderHistory.style'
import { getAmount, getDateFormat } from '../../utils/customFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import CustomImageContainer from '../CustomImageContainer'
import { Box } from '@mui/system'
import {
    setDeliveryManInfoByDispatch,
    setOrderDetailsByDispatch,
} from '../../redux/slices/searchFilter'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import startReview from '../../../public/static/star-review.png'
const OrderHist = ({
    id,
    order_amount,
    order_status,
    delivered,
    restaurant,
    created_at,
    delivery_man,
}) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantImage = global?.base_urls?.restaurant_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const dispatch = useDispatch()
    const handleClick = () => {
        if (delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(delivery_man))
        }
        router.push(`/order-history/${id}`)
    }

    const handleClickTrackOrder = () => {
        if (delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(delivery_man))
        }
        router.push(`/tracking/${id}`)
    }
    const handleRateButtonClick = () => {
        router.push(`/rate-and-review/${id}`)
    }
    return (
        <>
            <OrderBox>
                <Grid container item spacing={1}>
                    <Grid item md={3.5} xs={4.5} sm={4.5}>
                        <Box
                            sx={{ cursor: 'pointer', maxWidth: '125px' }}
                            onClick={() => handleClick()}
                        >
                            <CustomImageContainer
                                src={`${restaurantImage}/${restaurant.logo}`}
                                width="100%"
                                // height="125px"
                                // smHeight="80px"
                                borderRadius=".7rem"
                            />
                        </Box>

                        {/*<img*/}
                        {/*    src={`${restaurantImage}/${restaurant.logo}`}*/}
                        {/*    alt=""*/}
                        {/*    style={{*/}
                        {/*        width: '125px',*/}
                        {/*        height: '125px',*/}
                        {/*        cursor: 'pointer',*/}
                        {/*    }}*/}
                        {/*    onClick={() => router.push(`/order-history/${id}`)}*/}
                        {/*/>*/}
                    </Grid>
                    <Grid item md={8.5} xs={7.5} sm={7.5}>
                        <OrderIdTypography
                            variant="h3"
                            onClick={() => handleClick()}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                component="span"
                                variant={{ xs: 'h5', md: 'h3' }}
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            >
                                {t('Order ID')}
                            </Typography>{' '}
                            {id}
                        </OrderIdTypography>
                        <DateTypography>
                            {order_status == 'delivered' ? (
                                <CustomFormatedDateTime date={delivered} />
                            ) : (
                                <CustomFormatedDateTime date={created_at} />
                            )}
                        </DateTypography>
                        <OrderAmountTypography>
                            {t('Order Amount')}:{' '}
                            {getAmount(
                                order_amount,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                        </OrderAmountTypography>
                        <ButtonTypography>
                            {order_status == 'delivered' ? (
                                <CustomStackFullWidth
                                    // alignItems="flex-end"
                                    spacing={1}
                                    justifyContent="space-between"
                                    direction={{
                                        xs: 'column',
                                        sm: 'column',
                                        md: 'row',
                                    }}
                                >
                                    <SuccessButton
                                        size="small"
                                        onClick={() => handleClick()}
                                    >
                                        {t('Delivered')}
                                    </SuccessButton>
                                    <Button
                                        onClick={() => handleRateButtonClick()}
                                        variant="outlined"
                                        sx={{
                                            p: {
                                                xs: '5px',
                                                sm: '5px',
                                                md: '6px',
                                            },
                                        }}
                                    >
                                        <Stack
                                            alignItems="center"
                                            justifyContent="space-between"
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                        >
                                            <CustomImageContainer
                                                src={startReview.src}
                                                width="25px"
                                                height="25px"
                                            />
                                            <CustomColouredTypography color="primary">
                                                {t('Give Review')}
                                            </CustomColouredTypography>
                                        </Stack>
                                    </Button>
                                </CustomStackFullWidth>
                            ) : (
                                <CustomStackFullWidth
                                    // alignItems="flex-end"
                                    spacing={1}
                                    justifyContent="space-between"
                                    direction={{
                                        xs: 'column',
                                        sm: 'column',
                                        md: 'row',
                                    }}
                                >
                                    <PendingButton size="small">
                                        {order_status === 'failed'
                                            ? t('Payment Failed')
                                            : t(order_status).replaceAll("_"," ")}
                                    </PendingButton>
                                    {order_status !== 'delivered' &&
                                        order_status !== 'failed' &&
                                        order_status !== 'canceled' &&
                                        order_status !== 'refund_requested' &&
                                        order_status !== 'refunded' &&
                                        (
                                            <Stack flexWrap="wrap">
                                                <TrackhButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleClickTrackOrder()
                                                    }
                                                >
                                                    <LocalShippingIcon
                                                        sx={{ fontSize: '14px' }}
                                                    />
                                                    {t('Track Order')}
                                                </TrackhButton>
                                            </Stack>
                                        )}
                                </CustomStackFullWidth>
                            )}
                        </ButtonTypography>
                    </Grid>
                </Grid>
            </OrderBox>
        </>
    )
}

export default OrderHist

import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import img from '../../../public/static/order/Rectangle 8233 (3).png'
import StarIcon from '@mui/icons-material/Star'
import {
    CalculationGrid,
    IformationGrid,
    InfoTypography,
    OrderFoodAmount,
    OrderFoodName,
    OrderStatusBox,
    OrderStatusGrid,
    OrderSummary,
    OrderSummaryGrid,
    TitleTypography,
    TotalGrid,
} from './OrderDetail.style'
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { getAmount } from '../../utils/customFunctions'
import Loading from '../custom-loading/Loading'
import { useSelector } from 'react-redux'
import { ImageSource } from '../../utils/ImageSource'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import TopDetails from './TopDetails'
import DeliveryTimeInfo from './DeliveryTimeInfo'
import OrderDetailsBottom from './OrderDetailsBottom'
import OrderDetailsShimmer from './OrderDetailsShimmer'
import GifShimmer from './GifShimmer'
import PaymentUpdate from './PaymentUpdate'
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypography } from '../custom-tables/Tables.style'
import ChatIcon from '@mui/icons-material/Chat'
import Link from 'next/link'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import { useTheme } from '@mui/material/styles'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import RefundModal from '../order-history/RefundModal'
import { useGetRefundReasons } from '../../hooks/react-query/refund-request/useGetRefundReasons'
import { useStoreRefundRequest } from '../../hooks/react-query/refund-request/useStoreRefundRequest'
import { toast } from 'react-hot-toast'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import VisibleVariations from '../floating-cart/VisibleVariations'
import { getVariationNames } from './OrderSummeryVariations'
import DeliveryTimeInfoVisibility from './DeliveryTimeInfoVisibility'
import Refund from './Refund'

function getRestaurantValue(data, key) {
    return data?.data?.[0]?.food_details?.[key]
}

function getSubTotal(data, addOnsPrice = 0) {
    // let sun_total = 0;
    let totalPrice = 0
    if (data?.data?.length > 0) {
        data?.data?.map((item) => {
            totalPrice +=
                item.food_details.price * item.food_details.order_count
        })
        if (addOnsPrice > 0) return totalPrice + addOnsPrice
        return totalPrice
    }

    return totalPrice
}

function getAddons(data) {
    let totalAddons = 0
    if (data?.data?.length > 0) {
        data?.data?.map((item) => {
            totalAddons += item.total_add_on_price
        })
        return totalAddons
    }
    return totalAddons
}

function getDiscount(data) {
    let totalDiscount = 0
    if (data?.data?.length > 0) {
        data?.data?.map((item) => {
            totalDiscount += item.discount_on_food
        })

        return totalDiscount
    }

    return totalDiscount
}

function getTotalTax(data) {
    let totalTax = 0
    if (data?.data?.length > 0) {
        data?.data?.map((item) => {
            totalTax += item.tax_amount
        })

        return totalTax
    }

    return totalTax
}

function getTotalPrice(subTotal, discountPrice, taxAmount) {
    return subTotal + taxAmount - discountPrice
}

const getItemsPrice = (items) => {
    const productPrice = items.reduce(
        (total, product) => product.price * product.quantity + total,
        0
    )
    return productPrice
}
const getAddOnsPrice = (items) => {
    let productAddonsPrice = items.reduce(
        (total, product) =>
            (product.add_ons.length > 0
                ? product.add_ons.reduce(
                      (cTotal, cProduct) =>
                          cProduct.price * cProduct.quantity + cTotal,
                      0
                  )
                : 0) + total,
        0
    )
    return productAddonsPrice
}

const getSubTotalPrice = (dataList) => {
    return getItemsPrice(dataList) + getAddOnsPrice(dataList)
}
const getAddOnsNames = (addOns) => {
    const names = addOns.map(
        (item, index) =>
            `${addOns[0].name}(${addOns[0].quantity})${
                index !== addOns.length - 1 ? ',' : ''
            }`
    )
    return names
}

const OrderDetails = () => {
    const [openModal, setOpenModal] = useState(false)
    const theme = useTheme()
    const router = useRouter()
    const { t } = useTranslation()
    const { id } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const productImageUrl = global?.base_urls?.product_image_url

    const [subTotal, setSubTotal] = useState(0)
    const [addOnsPrice, setAddOnsPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [taxAmount, setTaxAmount] = useState(0)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { data: reasonsData } = useGetRefundReasons()

    const { mutate, isLoading: refundIsLoading } = useStoreRefundRequest()
    const formSubmitHandler = (values) => {
        const tempValue = { ...values, id }
        const onSuccessHandler = async (resData) => {
            if (resData) {
                await refetchTrackData()
                toast.success(resData.message)
                setOpenModal(false)
            }

            // router.push('/')
        }
        mutate(tempValue, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }

    const {
        isLoading,
        data,
        isError,
        error,
        refetch: refetchOrderDetails,
    } = useQuery(['order-details', id], () => OrderApi.orderDetails(id), {
        onError: onSingleErrorResponse,
    })


    const { data: trackData, refetch: refetchTrackData } = useQuery(
        [`category-tracking`, id],
        () => OrderApi.orderTracking(id)
    )
    const restaurantBaseUrl = global?.base_urls?.restaurant_cover_photo_url

    if (data) {
    }

    useEffect(() => {
        setSubTotal(getSubTotal(data, getAddons(data)))
        setAddOnsPrice(getAddons(data))
        setDiscountPrice(getDiscount(data))
        setTaxAmount(getTotalTax(data))
    }, [data])

    if (isLoading) {
        return <OrderDetailsShimmer />
    }
    const productBaseUrlCampaign = global?.base_urls?.campaign_image_url
    const productBaseUrl = global?.base_urls?.product_image_url


    return (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            mb="2rem"
            spacing={2}
        >
            <TopDetails data={data} trackData={trackData} />
            {trackData ? (
                <DeliveryTimeInfoVisibility trackData={trackData} />
            ) : (
                <GifShimmer />
            )}

            <CustomPaperBigCard>
                <Grid container item md={12} lg={12} xs={12}>
                    <Grid item md={7}>
                        <OrderStatusBox>
                            <OrderStatusGrid container md={12} xs={12}>
                                {/*<Grid item md={12} xs={12}>*/}
                                {/*    <CustomTypography align="left">*/}
                                {/*        {t('Order Status')}*/}
                                {/*    </CustomTypography>*/}
                                {/*</Grid>*/}
                                <Grid item md={5} xs={12}>
                                    <Typography
                                        sx={{ fontWeight: '600' }}
                                        align="left"
                                    >
                                        {t('Payment method')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: '700',
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                            textTransform: 'capitalize',
                                        }}
                                        align="left"
                                    >
                                        {trackData &&
                                            t(
                                                trackData?.data?.payment_method
                                            ).replaceAll('_', ' ')}
                                    </Typography>
                                    <Typography
                                        sx={{ fontWeight: '500' }}
                                        align="left"
                                    >
                                        {t('Amount')} :{' '}
                                        {trackData &&
                                            getAmount(
                                                trackData?.data?.order_amount,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                    </Typography>
                                </Grid>
                                <Grid item md={7} xs={12}>
                                    <Typography
                                        sx={{
                                            fontWeight: '500',
                                            textTransform: 'capitalize',
                                        }}
                                        align="left"
                                    >
                                        {t('Order Status')} :{' '}
                                        <Typography
                                            component="span"
                                            textTransform="capitalize"
                                            color={theme.palette.info.dark}
                                            align="left"
                                        >
                                            {trackData &&
                                                trackData?.data
                                                    ?.order_status ==="canceled"? "Cancelled":
                                                t(
                                                    trackData?.data
                                                        ?.order_status
                                                ).replaceAll('_', ' ')
                                            }
                                        </Typography>{' '}
                                    </Typography>
                                    { trackData?.data
                                        ?.order_status==="canceled" && <Typography
                                        sx={{
                                            fontWeight: '500',
                                            textTransform: 'capitalize',
                                        }}
                                        align="left"
                                    >
                                        {t('Cancellation Note')} :{' '}
                                        <Typography
                                            component="span"
                                            textTransform="capitalize"
                                            color={theme.palette.info.dark}
                                            align="left"
                                        >
                                            {trackData &&
                                                t(
                                                    trackData?.data
                                                        ?.cancellation_reason
                                                ).replaceAll('_', ' ')}
                                        </Typography>{' '}
                                    </Typography>}
                                    <Typography
                                        sx={{ fontWeight: '500' }}
                                        align="left"
                                    >
                                        {t('Payment Status')} :{' '}
                                        {trackData &&
                                        trackData?.data?.payment_status ===
                                            'paid' ? (
                                            <span
                                                style={{
                                                    color: 'rgba(166,224,191)',
                                                }}
                                            >
                                                {t('Paid')}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: 'red',
                                                }}
                                            >
                                                {t('Unpaid')}
                                            </span>
                                        )}
                                    </Typography>
                                </Grid>
                                {trackData?.data?.refund &&
                                trackData?.data?.order_status ===
                                    'refund_request_canceled' ? (
                                    <Grid item xs={12} align="left">
                                        <Refund
                                            t={t}
                                            title="Refund cancellation note:"
                                            note={
                                                trackData?.data?.refund
                                                    ?.admin_note
                                            }
                                        />
                                    </Grid>
                                ) : (
                                    trackData?.data?.order_status ===
                                        'refund_requested' && (
                                        <Grid item xs={12} align="left">
                                            <Refund
                                                t={t}
                                                title="Refund request note:"
                                                note={
                                                    trackData?.data?.refund
                                                        ?.customer_note
                                                }
                                                reason={
                                                    trackData?.data?.refund
                                                        ?.customer_reason
                                                }
                                                image={
                                                    trackData?.data?.refund
                                                        ?.image
                                                }
                                            />
                                        </Grid>
                                    )
                                )}
                            </OrderStatusGrid>
                        </OrderStatusBox>

                        <Box>
                            <IformationGrid
                                container
                                md={12}
                                xs={12}
                                columnSpacing={{ xs: 1 }}
                            >
                                <Grid item md={12} xs={12}>
                                    <TitleTypography align="left">
                                        {t('Restaurant Informations')}
                                    </TitleTypography>
                                </Grid>
                                <Grid item md={3.5} sm={4} xs={12}>
                                    {trackData && (
                                        <CustomImageContainer
                                            src={ImageSource(
                                                restaurantBaseUrl,
                                                trackData?.data?.restaurant
                                                    ?.cover_photo
                                            )}
                                            height="120px"
                                            borderRadius=".5rem"
                                        />
                                        // <img
                                        //     height="120px"
                                        //     src={ImageSource(
                                        //         restaurantBaseUrl,
                                        //         trackData?.data?.restaurant
                                        //             ?.cover_photo
                                        //     )}
                                        //     loading="lazy"
                                        //     className="img-border"
                                        // />
                                    )}
                                </Grid>

                                <Grid item md={6.5} sm={8} xs={12}>
                                    <InfoTypography>
                                        {trackData &&
                                            trackData?.data?.restaurant?.name}
                                    </InfoTypography>
                                    <InfoTypography sx={{ fontWeight: 'bold' }}>
                                        {trackData &&
                                            trackData?.data?.restaurant
                                                ?.avg_rating?.toFixed(1)}
                                        <StarIcon
                                            sx={{
                                                fontSize: '16px',
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            }}
                                        />{' '}
                                    </InfoTypography>
                                    <InfoTypography>
                                        {t('Address')} :{' '}
                                        {trackData &&
                                            trackData?.data?.restaurant
                                                ?.address}
                                    </InfoTypography>
                                </Grid>
                                {trackData &&
                                    trackData?.data?.order_status !==
                                        'delivered' &&
                                    trackData?.data?.order_status !==
                                        'failed' &&
                                    trackData?.data?.order_status !==
                                        'canceled' &&
                                    trackData?.data?.order_status !==
                                        'refunded' &&
                                    trackData?.data?.restaurant
                                        ?.restaurant_model === 'subscription' &&
                                    Number.parseInt(
                                        trackData?.data?.restaurant
                                            ?.restaurant_sub?.chat
                                    ) === 1 && (
                                        <Grid
                                            item
                                            md={2}
                                            xs={12}
                                            container
                                            justifyContent="flex-end"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Link
                                                href={{
                                                    pathname: '/chat',
                                                    query: {
                                                        type: 'vendor',
                                                        id: trackData?.data
                                                            ?.restaurant
                                                            .vendor_id,
                                                        routeName: 'vendor_id',
                                                        chatFrom: 'true',
                                                    },
                                                }}
                                            >
                                                <ChatIcon
                                                    sx={{
                                                        height: 25,
                                                        width: 25,
                                                        color: (theme) =>
                                                            theme.palette
                                                                .primary.main,
                                                    }}
                                                ></ChatIcon>
                                            </Link>
                                        </Grid>
                                    )}
                                {trackData &&
                                    trackData?.data?.order_status !==
                                        'delivered' &&
                                    trackData?.data?.order_status !==
                                        'failed' &&
                                    trackData?.data?.order_status !==
                                        'canceled' &&
                                    trackData?.data?.order_status !==
                                        'refunded' &&
                                    trackData?.data?.restaurant
                                        ?.restaurant_model === 'commission' && (
                                        <Grid
                                            item
                                            md={2}
                                            xs={12}
                                            container
                                            justifyContent="flex-end"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Link
                                                href={{
                                                    pathname: '/chat',
                                                    query: {
                                                        type: 'vendor',
                                                        id: trackData?.data
                                                            ?.restaurant
                                                            .vendor_id,
                                                        routeName: 'vendor_id',
                                                        chatFrom: 'true',
                                                    },
                                                }}
                                            >
                                                <ChatIcon
                                                    sx={{
                                                        height: 25,
                                                        width: 25,
                                                        color: (theme) =>
                                                            theme.palette
                                                                .primary.main,
                                                    }}
                                                ></ChatIcon>
                                            </Link>
                                        </Grid>
                                    )}
                            </IformationGrid>
                        </Box>
                    </Grid>
                    <OrderSummaryGrid item md={5} xs={12}>
                        <Grid item md={12} xs={12} align="center" mb="30px">
                            <CustomTypography variant="h4">
                                {t('Order Summery')}
                            </CustomTypography>
                        </Grid>
                        <SimpleBar style={{ maxHeight: '300px' }}>
                            {data?.data?.map((product) => (
                                <Grid
                                    container
                                    md={12}
                                    xs={12}
                                    spacing={{ xs: 1 }}
                                    key={product?.id}
                                    mb="1rem"
                                >
                                    <Grid item md={3} xs={4} sm={2}>
                                        {product.item_campaign_id ? (
                                            <CustomImageContainer
                                                src={`${productBaseUrlCampaign}/${product.food_details.image}`}
                                                height="90px"
                                                maxWidth="90px"
                                                width="100%"
                                                loading="lazy"
                                                smHeight="50px"
                                            />
                                        ) : (
                                            <CustomImageContainer
                                                src={`${productBaseUrl}/${product.food_details.image}`}
                                                height="90px"
                                                maxWidth="90px"
                                                width="100%"
                                                loading="lazy"
                                                smHeight="70px"
                                                borderRadius=".7rem"
                                            />
                                        )}
                                    </Grid>
                                    <Grid item md={9} xs={8} sm={8}>
                                        <OrderFoodName>
                                            {product?.food_details?.name}
                                        </OrderFoodName>
                                        <OrderFoodName>
                                            {t('Qty')}: {product?.quantity}
                                        </OrderFoodName>
                                        {product?.add_ons.length > 0 && (
                                            <OrderFoodName>
                                                {t('Addons')}:{' '}
                                                {getAddOnsNames(
                                                    product?.add_ons
                                                )}
                                            </OrderFoodName>
                                        )}
                                        {product?.variation?.length > 0 && (
                                            <>{getVariationNames(product, t)}</>
                                        )}

                                        <OrderFoodAmount>
                                            {getAmount(
                                                product?.food_details?.price,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                        </OrderFoodAmount>
                                    </Grid>
                                </Grid>
                            ))}
                        </SimpleBar>
                        <Grid item md={12} xs={12} mb="10px">
                            <Stack
                                width="100%"
                                sx={{
                                    mt: '20px',
                                    borderBottom: `2px solid ${theme.palette.neutral[300]}`,
                                }}
                            ></Stack>
                        </Grid>
                        <CalculationGrid
                            container
                            item
                            md={12}
                            xs={12}
                            spacing={1}
                        >
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Items Price')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    {data &&
                                        getAmount(
                                            getItemsPrice(data?.data),
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Addons Price')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    {data &&
                                        getAmount(
                                            getAddOnsPrice(data?.data),
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Subtotal')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    {data &&
                                        getAmount(
                                            getSubTotalPrice(data?.data),
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Discount')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography align="right">
                                    (-)
                                    <Typography
                                        component="span"
                                        marginLeft="4px"
                                    >
                                        {trackData &&
                                        trackData?.data
                                            ?.restaurant_discount_amount
                                            ? getAmount(
                                                  trackData?.data
                                                      ?.restaurant_discount_amount,
                                                  currencySymbolDirection,
                                                  currencySymbol,
                                                  digitAfterDecimalPoint
                                              )
                                            : 0}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Coupon Discount')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    (-)
                                    <Typography
                                        component="span"
                                        marginLeft="4px"
                                        variant="h5"
                                    >
                                        {trackData &&
                                            getAmount(
                                                trackData?.data
                                                    ?.coupon_discount_amount,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('VAT')}({getRestaurantValue(data, 'tax')}
                                    %)
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4} align="right">
                                <Typography variant="h5">
                                    (+)
                                    <Typography
                                        component="span"
                                        variant="h5"
                                        marginLeft="4px"
                                    >
                                        {trackData &&
                                            getAmount(
                                                trackData?.data
                                                    ?.total_tax_amount,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Delivery man tips')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    {trackData &&
                                        getAmount(
                                            trackData?.data?.dm_tips,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Typography variant="h5">
                                    {t('Delivery fee')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Typography variant="h5" align="right">
                                    {trackData &&
                                        getAmount(
                                            trackData?.data?.delivery_charge,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                        </CalculationGrid>
                        <Grid item md={12} xs={12} mb="10px">
                            <Stack
                                width="100%"
                                sx={{
                                    mt: '20px',
                                    borderBottom: `2px solid ${theme.palette.neutral[300]}`,
                                }}
                            ></Stack>
                        </Grid>
                        <TotalGrid container md={12} xs={12}>
                            <Grid item md={8} xs={8}>
                                <Typography color={theme.palette.primary.main}>
                                    {t('Total')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4} align="right">
                                <Typography color={theme.palette.primary.main}>
                                    {trackData &&
                                        getAmount(
                                            trackData?.data?.order_amount,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Grid>
                        </TotalGrid>
                    </OrderSummaryGrid>
                </Grid>
            </CustomPaperBigCard>
            {trackData?.data?.order_status === 'delivered' && (
                <CustomPaperBigCard>
                    <Grid container spacing={1}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={global?.refund_active_status ? 6 : 12}
                        >
                            <Link href={`/rate-and-review/${id}`}>
                                <PrimaryButton
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                >
                                    {t('Give a review')}
                                </PrimaryButton>
                            </Link>
                        </Grid>

                        {global?.refund_active_status && (
                            <Grid item xs={12} sm={12} md={6}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    }}
                                    onClick={() => setOpenModal(true)}
                                >
                                    {t('Refund Request')}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </CustomPaperBigCard>
            )}

            {trackData &&
                (trackData?.data?.order_status === 'confirmed' ||
                    trackData?.data?.order_status === 'pending') && (
                    <Box sx={{ marginTop: '1rem' }} width="100%">
                        <OrderDetailsBottom
                            id={id}
                            refetchOrderDetails={refetchOrderDetails}
                            refetchTrackData={refetchTrackData}
                            trackData={trackData}
                        />
                    </Box>
                )}
            {trackData && trackData?.data?.order_status === 'failed' && (
                <PaymentUpdate
                    id={id}
                    refetchOrderDetails={refetchOrderDetails}
                    refetchTrackData={refetchTrackData}
                    trackData={trackData}
                />
            )}

            <RefundModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                reasons={reasonsData?.refund_reasons}
                formSubmit={formSubmitHandler}
                refundIsLoading={refundIsLoading}
            />
        </CustomStackFullWidth>
    )
}

export default OrderDetails

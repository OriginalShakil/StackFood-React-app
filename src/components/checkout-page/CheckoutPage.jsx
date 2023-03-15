import React, { useEffect, useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { OrderSummary } from './CheckOut.style'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAmount,
    getFinalTotalPrice,
    getProductDiscount,
    getTaxableTotalPrice,
    getVariation,
    isFoodAvailableBySchedule, maxCodAmount,
} from '../../utils/customFunctions'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment'
import { getDayNumber } from './const'
import HaveCoupon from './HaveCoupon'
import { GoogleApi } from '../../hooks/react-query/config/googleApi'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import Router, { useRouter } from 'next/router'
import { ProfileApi } from '../../hooks/react-query/config/profileApi'
import DeliveryDetails from './DeliveryDetails'
import RestaurantScheduleTime from './RestaurantScheduleTime'
import OrderSummaryDetails from './order-summary/OrderSummaryDetails'
import OrderCalculation from './order-summary/OrderCalculation'
import PaymentOptions from './order-summary/PaymentOptions'
import PlaceOrder from './order-summary/PlaceOrder'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import { baseUrl } from '../../api/MainApi'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import DeliveryManTips from './DeliveryManTips'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { setZoneData } from '../../redux/slices/global'
import { setUser } from '../../redux/slices/customer'
import { setWalletAmount } from '../../redux/slices/cart'
import useGetVehicleCharge from "../../hooks/react-query/config/useGetVehicleCharge";

let currentDate = moment().format('YYYY/MM/DD HH:mm')
let nextday = moment(currentDate).add(1, 'days').format('YYYY/MM/DD')

let today = moment(currentDate).format('dddd')
let tomorrow = moment(nextday).format('dddd')

var CurrentDatee = moment().format()

let todayTime = moment(CurrentDatee).format('HH:mm')

const CheckoutPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { global, couponInfo } = useSelector((state) => state.globalSettings)
    const { cartList, campFoodList, type, totalAmount, walletAmount } =
        useSelector((state) => state.cart)
    const [address, setAddress] = useState(undefined)
    const [paymenMethod, setPaymenMethod] = useState('cash_on_delivery')
    const [numberOfDay, setDayNumber] = useState(getDayNumber(today))
    const [orderType, setOrderType] = useState('delivery')
    const [couponDiscount, setCouponDiscount] = useState(null)
    const [scheduleAt, setScheduleAt] = useState('now')
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [taxAmount, setTaxAmount] = useState(0)
    const [total_order_amount, setTotalOrderAmount] = useState(0)
    const [enabled, setEnabled] = useState(cartList?.length ? true : false)
    const [deliveryTip, setDeliveryTip] = useState(0)
    const text1=t("You can not Order more then")
    const text2=t("on COD order")
    const { page } = router.query
    const notify = (i) => toast(i)


    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    // const c = couponDiscount
    //     ? getCouponDiscount(couponDiscount, restaurantData?.data, cartList)
    //     : ''
    const currentLatLng = JSON.parse(
        window.localStorage.getItem('currentLatLng')
    )
    const { data: zoneData } = useQuery(
        ['zoneId', location],
        async () => GoogleApi.getZoneId(currentLatLng),
        {
            retry: 1,
        }
    )

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (zoneData) {
                dispatch(setZoneData(zoneData?.data?.zone_data))
                localStorage.setItem('zoneid', zoneData?.data?.zone_id)
            }
        }
    }, [zoneData])
    const {
        isLoading,
        data: restaurantData,
        isError,
        error,
        refetch,
    } = useQuery(
        [`restaurant-details`],
        () =>
            RestaurantsApi.restaurantDetails(
                page === 'campaign'
                    ? campFoodList?.[0]?.restaurant_id
                    : cartList[0].restaurant_id
            ),
        { enabled: false, onError: onErrorResponse }
    )

    const { data: distanceData, refetch: refetchDistance } = useQuery(
        ['get-distance', restaurantData?.data, address],
        () => GoogleApi.distanceApi(restaurantData?.data, address),
        {
            onError: onErrorResponse,
        }
    )
    const tempDistance=distanceData?.data?.rows?.[0]?.elements[0]?.distance?.value/1000

    const {data:extraCharge,refetch:extraChargeRefetch}=useGetVehicleCharge({tempDistance})
    useEffect(() => {
         extraChargeRefetch()
    }, [distanceData]);
    const handleChange = (event) => {
        setDayNumber(event.target.value)
    }
    const { mutate: orderMutation, isLoading: orderLoading } = useMutation(
        'order-place',
        OrderApi.placeOrder
    )
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res.data))
        dispatch(setWalletAmount(res?.data?.wallet_balance))
    }
    const { isLoading: customerLoading, data: customerData } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            onSuccess: userOnSuccessHandler,
            onError: onSingleErrorResponse,
        }
    )
    useEffect(() => {}, [customerData])

    useEffect(async () => {
        const currentLatLng = JSON.parse(localStorage.getItem('currentLatLng'))
        const location = localStorage.getItem('location')
        setAddress({
            ...currentLatLng,
            latitude: currentLatLng?.lat,
            longitude: currentLatLng?.lng,
            address: location,
            address_type: 'Selected Address',
        })
        await refetch()
    }, [])
    useEffect(() => {
        restaurantData && address && refetchDistance()
    }, [restaurantData])

    useEffect(() => {
        const taxAmount = getTaxableTotalPrice(
            cartList,
            couponDiscount,
            restaurantData?.data?.tax,
            restaurantData?.data
        )

        setTaxAmount(taxAmount)
    }, [cartList, couponDiscount, restaurantData])
    useEffect(() => {
        const total_order_amount = getFinalTotalPrice(
            cartList,
            couponDiscount,
            taxAmount,
            restaurantData
        )
        setTotalOrderAmount(total_order_amount)
    }, [cartList, couponDiscount, taxAmount])

    const handleValuesFromCartItems = (variationValues) => {
        let value = []
        if (variationValues?.length > 0) {
            variationValues?.forEach((item) => {
                if (item?.isSelected) {
                    value.push(item?.label)
                }
            })
        } else {

            variationValues &&  value.push(variationValues[0]?.label)
        }
        return value
    }

    const handleProductList = (productList, totalQty) => {
        return productList?.map((cart) => {
            return {
                add_on_ids: cart?.selectedAddons?.map((add) => {
                    return add.id
                }),
                add_on_qtys: cart?.selectedAddons?.map((add) => {
                    totalQty += add.quantity
                    return totalQty
                }),
                add_ons: cart?.selectedAddons?.map((add) => {
                    return {
                        id: add.id,
                        name: add.name,
                        price: add.price,
                    }
                }),
                food_id: cart?.available_date_starts ? null : cart?.id,
                item_campaign_id: cart?.available_date_starts ? cart?.id : null,

                price: cart?.price,
                quantity: cart?.quantity,
                variant: getVariation(cart?.variation),
                //new variation form needs to added here
                variations: cart?.variations?.map((variation) => {
                    return {
                        name: variation.name,
                        values: {
                            label: handleValuesFromCartItems(variation.values),
                        },
                    }
                }),
            }
        })
    }
    const handleOrderMutationObject = (carts, productList) => {
        return {
            cart: carts,
            ...address,
            schedule_at: scheduleAt === 'now' ? null : scheduleAt,
            // order_time: scheduleAt,
            payment_method: paymenMethod,
            order_type: orderType,
            restaurant_id: restaurantData?.data?.id,
            coupon_code: couponDiscount?.code,
            coupon_discount_amount: couponDiscount?.discount,
            coupon_discount_title: couponDiscount?.title,
            discount_amount: getProductDiscount(productList),
            distance:
                distanceData?.data?.rows?.[0]?.elements?.[0]?.distance?.value /
                1000,
            order_amount: totalAmount,
            dm_tips: deliveryTip,
        }
    }

    const orderPlaceMutation=(carts,handleSuccess,orderMutation,productList)=>{
        let order = handleOrderMutationObject(carts, productList)
        orderMutation(order, {
            onSuccess: handleSuccess,
            onError: (error) => {
                error?.response?.data?.errors?.forEach((item) =>
                    toast.error(item.message, {
                        position: 'bottom-right',
                    })
                )
            },
        })
    }

    const placeOrder = () => {
        let isAvailable = isFoodAvailableBySchedule(cartList, scheduleAt)
        if (isAvailable) {
            //const walletBalance = localStorage.getItem('wallet_amount')

            let productList = page === 'campaign' ? campFoodList : cartList
            if (paymenMethod === 'wallet') {
                if (Number(walletAmount) < Number(totalAmount)) {
                    toast.error(t('Wallet balance is below total amount.'), {
                        id: 'wallet',
                        position: 'bottom-right',
                    })
                } else {
                    let totalQty = 0
                    let carts = handleProductList(productList, totalQty)
                    // let totalAmount = JSON.parse(
                    //     localStorage.getItem('totalAmount')
                    // )
                    const handleSuccessSecond = (response) => {
                        if (response?.data) {
                            if (paymenMethod === 'digital_payment') {
                                toast.success(response?.data?.message)
                                const newBaseUrl = baseUrl.substring(0, 31)
                                const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}`
                                const url = `${window.location.origin}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&callback=${callBackUrl}`
                            } else if (paymenMethod === 'wallet') {
                                toast.success(response?.data?.message)
                                setOrderSuccess(true)
                            } else {
                                if (response.status === 203) {
                                    toast.error(response.data.errors[0].message)
                                }
                                //setOrderSuccess(true)
                            }
                        }
                    }
                    if (carts?.length > 0) {
                        orderPlaceMutation(carts,handleSuccessSecond,orderMutation,productList)
                    }
                }
            }
            else if(paymenMethod === 'cash_on_delivery') {
                const totalMaxCodAmount=maxCodAmount(restaurantData,global,zoneData)
                if( totalMaxCodAmount!==0 && Number.parseInt(totalAmount)> Number.parseInt(totalMaxCodAmount)){
                    toast.error(`${text1} ${getAmount(totalMaxCodAmount,
                        currencySymbolDirection,
                        currencySymbol,
                        digitAfterDecimalPoint)}  ${text2}`)
                }else{
                    const handleSuccessCod=(response)=>{
                        toast.success(response?.data?.message)
                        setOrderSuccess(true)
                    }
                    let totalQty = 0
                    let carts = handleProductList(productList, totalQty)
                    if (carts?.length > 0) {
                        orderPlaceMutation(carts,handleSuccessCod,orderMutation,productList)
                    }
                }
            }
            else {
                let totalQty = 0
                let carts = handleProductList(productList, totalQty)
                const handleSuccess = (response) => {
                    //toast.success(response?.data?.message)

                    if (response?.data) {
                        if (paymenMethod === 'digital_payment') {
                            const newBaseUrl = baseUrl.substring(0, 31)
                            const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}`
                            const url = `${baseUrl}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&callback=${callBackUrl}`
                            Router.push(url)
                        } else {
                                toast.success(response?.data?.message)
                                setOrderSuccess(true)}
                    }
                }
                if (carts?.length > 0) {
                    orderPlaceMutation(carts,handleSuccess,orderMutation,productList)
                }
            }
        } else {
            toast.error(
                t(
                    'One or more item is not available for the chosen preferable schedule time.'
                )
            )
        }
    }
    const counponRemove = () => {}
    if (orderSuccess) {
        Router.push('/order')
    }


    return (
        <Grid container spacing={3} mb="2rem">
            <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                    <DeliveryDetails
                        restaurantData={restaurantData}
                        setOrderType={setOrderType}
                        orderType={orderType}
                        setAddress={setAddress}
                        address={address}
                    />
                    <RestaurantScheduleTime
                        restaurantData={restaurantData}
                        handleChange={handleChange}
                        today={today}
                        tomorrow={tomorrow}
                        numberOfDay={numberOfDay}
                        global={global}
                        setScheduleAt={setScheduleAt}
                    />
                    {restaurantData?.data && (
                        <HaveCoupon
                            restaurant_id={restaurantData?.data?.id}
                            setCouponDiscount={setCouponDiscount}
                            counponRemove={counponRemove}
                            couponDiscount={couponDiscount}
                        />
                    )}
                    {Number.parseInt(global?.dm_tips_status) === 1 && (
                        <DeliveryManTips
                            deliveryTip={deliveryTip}
                            setDeliveryTip={setDeliveryTip}
                        />
                    )}
                </Stack>
            </Grid>
            <Grid item xs={12} md={5} height="auto">
                <CustomPaperBigCard height="auto">
                    <Stack spacing={3} justifyContent="space-between">
                        <OrderSummary variant="h4">
                            {t('Order Summary')}
                        </OrderSummary>

                        <SimpleBar
                            style={{ maxHeight: '500px', width: '100%' }}
                        >
                            <OrderSummaryDetails
                                type={type}
                                page={page}
                                global={global}
                            />
                        </SimpleBar>
                        {distanceData && restaurantData ? (
                            <OrderCalculation
                                cartList={
                                    page === 'campaign'
                                        ? campFoodList
                                        : cartList
                                }
                                restaurantData={restaurantData}
                                couponDiscount={couponDiscount}
                                taxAmount={taxAmount}
                                distanceData={distanceData}
                                total_order_amount={total_order_amount}
                                global={global}
                                couponInfo={couponInfo}
                                orderType={orderType}
                                deliveryTip={deliveryTip}
                                origin={restaurantData?.data}
                                destination={address}
                                extraCharge={extraCharge}
                            />
                        ) : (
                            <CustomStackFullWidth spacing={1}>
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Skeleton variant="text" width="50px" />
                                    <Skeleton variant="text" width="50px" />
                                </CustomStackFullWidth>
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Skeleton variant="text" width="50px" />
                                    <Skeleton variant="text" width="50px" />
                                </CustomStackFullWidth>
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Skeleton variant="text" width="50px" />
                                    <Skeleton variant="text" width="50px" />
                                </CustomStackFullWidth>
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Skeleton variant="text" width="50px" />
                                    <Skeleton variant="text" width="50px" />
                                </CustomStackFullWidth>
                            </CustomStackFullWidth>
                        )}
                    </Stack>
                </CustomPaperBigCard>
            </Grid>
            <Grid item md={7} xs={12}>
                <PaymentOptions
                    global={global}
                    paymenMethod={paymenMethod}
                    setPaymenMethod={setPaymenMethod}
                />
            </Grid>
            <Grid item md={12} xs={12}>
                <PlaceOrder
                    placeOrder={placeOrder}
                    orderLoading={orderLoading}
                />
            </Grid>
        </Grid>
    )
}

export default CheckoutPage

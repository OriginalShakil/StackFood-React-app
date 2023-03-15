import moment from 'moment'
import React from 'react'
import { t } from 'i18next'
import _ from 'lodash'

export const getNumberWithConvertedDecimalPoint = (
    amount,
    digitAfterDecimalPoint
) => {
    let newNumber = ((amount * 100) / 100).toFixed(
        Number.parseInt(digitAfterDecimalPoint)
    )
    return newNumber
}
export const getAmount = (
    amount,
    currency_symbol_direction,
    currency_symbol,
    digitAfterDecimalPoint
) => {
    let newAmount = ((amount * 100) / 100).toFixed(
        Number.parseInt(digitAfterDecimalPoint)
    )
    if (currency_symbol_direction === 'left') {
        return `${currency_symbol}${newAmount}`
    } else if (currency_symbol_direction === 'right') {
        return `${newAmount}${currency_symbol}`
    }
    return amount
}
const handleVariationValuesSum = (productVariations) => {
    let sum = 0
    if (productVariations.length > 0) {
        productVariations?.forEach((pVal) => {
            pVal?.values?.forEach((cVal) => {
                if (cVal?.isSelected) {
                    sum += Number.parseInt(cVal.optionPrice)
                }
            })
        })
    }
    return sum
}
export const getItemTotalWithoutDiscount = (item) => {
    return item?.price + handleVariationValuesSum(item.variations)
}
export const getSubTotalPrice = (cartList) => {
    //let a = cartList.forEach((item) => {})
    // getConvertDiscount(
    //     product.discount,
    //     product.discount_type,
    //     product?.price,
    //     product.restaurant_discount
    // )
    //product?.price + handleVariationValuesSum(product.variations)
    let ad = cartList.reduce(
        (total, product) =>
            (product.variations.length > 0
                ? getItemTotalWithoutDiscount(product)
                : product.price) *
                product.quantity +
            selectedAddonsTotal(product.selectedAddons) +
            total,
        0
    )
    return ad
}
export const getTotalPrice = (items) => {
    let totalPrice = 0
    if (items?.length > 0) {
        items.map((item) => {
            totalPrice += item.total_price
        })
        return totalPrice
    }
    return totalPrice
}
export const getFinalTotalPrice = (
    items,
    couponDiscount,
    taxAmount,
    restaurantData
) => {
    let totalPrice = 0
    if (items?.length > 0) {
        items.map((item) => {
            totalPrice +=
                item.price * item.quantity -
                getProductDiscount(items, restaurantData) +
                taxAmount
        })
        if (couponDiscount && couponDiscount?.discount)
            return (
                totalPrice -
                getCouponDiscount(couponDiscount, restaurantData?.data, items)
            )
        return totalPrice
    }
    return totalPrice
}

export const selectedAddonsTotal = (addOns) => {
    if (addOns.length > 0) {
        let vv = addOns.reduce(
            (total, addOn) => addOn.price * addOn.quantity + total,
            0
        )

        return vv
    } else {
        return 0
    }
}

export const getTaxableTotalPrice = (items, couponDiscount, restaurantData) => {
    let tax = restaurantData?.data?.tax
    let total =
        items.reduce(
            (total, product) =>
                (product.variations.length > 0
                    ? handleProductValueWithOutDiscount(product)
                    : product.price) *
                    product.quantity +
                selectedAddonsTotal(product.selectedAddons) +
                total,
            0
        ) -
        getProductDiscount(items, restaurantData) -
        (couponDiscount
            ? getCouponDiscount(couponDiscount, restaurantData, items)
            : 0)

    return (total * tax) / 100
}

export const getVariation = (variations) => {
    let variation = ''
    if (variations?.length > 0) {
        variations.map((item, index) => {
            // if (index > 1) variation += `-${item.value}`
            // variation += item.value
            variation += `${index !== 0 ? '-' : ''}${item.value.type}`
        })
    }
    return variation
}
export const getSelectedAddOn = (add_ons) => {
    let add_on = ''
    if (add_ons?.length > 0) {
        add_ons.map((item, index) => {
            add_on += `${index !== 0 ? ', ' : ''}${item.name}`
        })
    }
    return add_on
}

export const handleProductValueWithOutDiscount = (product) => {
    let productPrice = product.price
    if (product.variations.length > 0) {
        productPrice += handleVariationValuesSum(product.variations)
        return productPrice
    } else {
        return productPrice
    }
}

export const getProductDiscount = (items, restaurantData) => {
    if (restaurantData?.data?.discount) {
        let endDate = restaurantData?.data?.discount?.end_date
        let endTime = restaurantData?.data?.discount?.end_time
        let combinedEndDateTime = moment(
            `${endDate} ${endTime}`,
            'YYYY-MM-DD HH:mm:ss'
        ).format()
        let currentDateTime = moment().format()
        if (combinedEndDateTime > currentDateTime) {
            //restaurant wise discount
            let restaurentDiscount = restaurantData?.data?.discount?.discount
            let resDisType = restaurantData?.data?.discount?.discount_type
            let restaurentMinimumPurchase =
                restaurantData?.data?.discount?.min_purchase
            let restaurentMaxDiscount =
                restaurantData?.data?.discount?.max_discount
            let totalDiscount = items.reduce(
                (total, product) =>
                    (product.variations.length > 0
                        ? handleProductValueWithOutDiscount(product) -
                          getConvertDiscount(
                              restaurentDiscount,
                              resDisType,
                              handleProductValueWithOutDiscount(product),
                              product.restaurant_discount
                          )
                        : product.price -
                          getConvertDiscount(
                              restaurentDiscount,
                              resDisType,
                              product.price,
                              product.restaurant_discount
                          )) *
                        product.quantity +
                    total,
                0
            )

            let purchasedAmount = items.reduce(
                (total, product) =>
                    ((product.variations.length > 0
                        ? handleProductValueWithOutDiscount(product)
                        : product.price) +
                        (product.selectedAddons.length > 0
                            ? product.selectedAddons.reduce(
                                  (total, addOn) =>
                                      addOn.price * addOn.quantity + total,
                                  0
                              )
                            : 0)) *
                        product.quantity +
                    total,
                0
            )
            if (purchasedAmount >= restaurentMinimumPurchase) {
                if (totalDiscount >= restaurentMaxDiscount) {
                    return restaurentMaxDiscount
                } else {
                    return totalDiscount
                }
            } else {
                return 0
            }
        } else {
            //product wise discount
            let total = items.reduce(
                (total, product) =>
                    (handleProductValueWithOutDiscount(product) -
                        getConvertDiscount(
                            product.discount,
                            product.discount_type,
                            handleProductValueWithOutDiscount(product),
                            product.restaurant_discount
                        )) *
                    product.quantity,
                0
            )
            return total
        }
    } else {
        //product wise discount

        let total = items.reduce(
            (total, product) =>
                (handleProductValueWithOutDiscount(product) -
                    getConvertDiscount(
                        product.discount,
                        product.discount_type,
                        handleProductValueWithOutDiscount(product),
                        product.restaurant_discount
                    )) *
                product.quantity,
            0
        )
        return total
    }
}

const handleGlobalDeliveryFee = (
    global,
    totalOrderAmount,
    orderType,
    deliveryFee,
    extraCharge
) => {
    if (
        (global?.free_delivery_over !== null &&
            global?.free_delivery_over > 0 &&
            totalOrderAmount > global?.free_delivery_over) ||
        orderType === 'take_away'
    ) {
        return 0
    } else {
        if (deliveryFee > global?.maximum_shipping_charge) {
            return global?.maximum_shipping_charge + extraCharge
        } else if (global?.minimum_shipping_charge >= deliveryFee) {
            return global?.minimum_shipping_charge + extraCharge
        } else {
            return deliveryFee + extraCharge
        }
    }
}
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371
    let dLat = degreesToRadians(lat2 - lat1)
    let dLon = degreesToRadians(lon2 - lon1)

    lat1 = degreesToRadians(lat1)
    lat2 = degreesToRadians(lat2)

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiusKm * c
}

const handleDistance = (distance, origin, destination) => {
    if (distance?.[0]?.distance?.value) {
        return distance?.[0]?.distance?.value / 1000
    } else if (distance?.status === 'ZERO_RESULTS') {
        return distanceInKmBetweenEarthCoordinates(
            origin?.latitude,
            origin?.longitude,
            destination?.lat,
            destination?.lng
        )
    } else {
        return 0
    }
}
export const getDeliveryFees = (
    restaurantData,
    global,
    cartList,
    distance,
    couponDiscount,
    couponType,
    orderType,
    zoneData,
    origin,
    destination,
    extraCharge
) => {
    //convert m to km
    let convertedDistance = handleDistance(
        distance?.rows?.[0]?.elements,
        origin,
        destination
    )
    //distance?.rows?.[0]?.elements?.[0]?.distance?.value / 1000 || 0
    let deliveryFee
    let totalOrderAmount = cartItemsTotalAmount(cartList)

    //restaurant self delivery system checking
    if (Number.parseInt(restaurantData?.data?.self_delivery_system) === 1) {
        if (restaurantData?.data?.free_delivery) {
            return 0
        } else {
            deliveryFee =
                convertedDistance *
                    restaurantData?.data?.per_km_shipping_charge || 0
            if (
                deliveryFee > restaurantData?.data?.minimum_shipping_charge &&
                deliveryFee < restaurantData?.data?.maximum_shipping_charge
            ) {
                return deliveryFee
            } else {
                if (
                    deliveryFee < restaurantData?.data?.minimum_shipping_charge
                ) {
                    return restaurantData?.data?.minimum_shipping_charge
                } else if (
                    restaurantData?.data?.maximum_shipping_charge !== null &&
                    deliveryFee > restaurantData?.data?.maximum_shipping_charge
                ) {
                    return restaurantData?.data?.maximum_shipping_charge
                }
            }
        }
    } else {
        if (zoneData?.length > 0) {
            const restaurantChargeInfo = zoneData?.find(
                (item) =>
                    Number.parseInt(item.id) ===
                    Number.parseInt(restaurantData?.data?.zone_id)
            )
            if (
                restaurantChargeInfo &&
                Number.parseInt(restaurantData?.data?.self_delivery_system) !==
                    1
            ) {
                deliveryFee =
                    convertedDistance *
                        (restaurantChargeInfo?.per_km_shipping_charge || 0) +
                    extraCharge

                if (
                    deliveryFee < restaurantChargeInfo?.minimum_shipping_charge
                ) {
                    return restaurantChargeInfo?.minimum_shipping_charge
                } else if (
                    deliveryFee >
                        restaurantChargeInfo?.maximum_shipping_charge &&
                    restaurantChargeInfo?.maximum_shipping_charge !== null
                ) {
                    return restaurantChargeInfo?.maximum_shipping_charge
                } else {
                    // return deliveryFee + extraCharge
                    if (
                        (global?.free_delivery_over !== null &&
                            global?.free_delivery_over > 0 &&
                            totalOrderAmount > global?.free_delivery_over) ||
                        orderType === 'take_away'
                    ) {
                        return 0
                    } else {
                        return deliveryFee
                    }
                }
            }
            // else {
            //     return handleGlobalDeliveryFee(
            //         global,
            //         totalOrderAmount,
            //         orderType,
            //         deliveryFee,extraCharge
            //     )
            // }
        }
        // else {
        //     return handleGlobalDeliveryFee(
        //         global,
        //         totalOrderAmount,
        //         orderType,
        //         deliveryFee
        //     )
        // }
    }
}
export const getDateFormat = (date) => {
    return moment(date).format('LL')
}
export const getTotalWalletAmount = (data) => {
    let balance = 0
    if (data?.length > 0) {
        data.map((item) => {
            balance += item.credit - item.debit
        })
        //code here
        return balance
    }
    return balance
}
export const getTotalLoyalityAmount = (data) => {
    if (data?.length > 0) {
        //code here
        return 0
    }
    return 0
}
export const getConvertDiscount = (dis, disType, price, restaurantDiscount) => {
    if (restaurantDiscount === 0) {
        if (disType === 'amount') {
            price = price - dis
        } else if (disType === 'percent') {
            price = price - (dis / 100) * price
        }
        return price
    } else {
        return price - (price * restaurantDiscount) / 100
    }
}
export const getCouponDiscount = (couponDiscount, restaurantData, cartList) => {
    if (couponDiscount) {
        let purchasedAmount = cartList.reduce(
            (total, product) =>
                (product.variations.length > 0
                    ? handleProductValueWithOutDiscount(product)
                    : product.price) *
                    product.quantity +
                selectedAddonsTotal(product.selectedAddons) +
                total,
            0
        )
        if (purchasedAmount >= couponDiscount.min_purchase) {
            switch (couponDiscount.coupon_type) {
                case 'zone_wise':
                    let zoneid = JSON.parse(couponDiscount.data)
                    if (Number.parseInt(zoneid[0]) === couponDiscount.zoneId) {
                        if (
                            couponDiscount &&
                            couponDiscount.discount_type === 'amount'
                        ) {
                            if (couponDiscount.max_discount === 0) {
                                return couponDiscount.discount
                            } else {
                                return couponDiscount.discount
                            }
                        } else {
                            let percentageWiseDis =
                                (purchasedAmount -
                                    getProductDiscount(
                                        cartList,
                                        restaurantData
                                    )) *
                                (couponDiscount.discount / 100)
                            if (couponDiscount.max_discount === 0) {
                                return percentageWiseDis
                            } else {
                                if (
                                    percentageWiseDis >=
                                    couponDiscount.max_discount
                                ) {
                                    return couponDiscount.max_discount
                                } else {
                                    return percentageWiseDis
                                }
                            }
                        }
                    } else {
                        return 4
                    }
                    break
                case 'restaurant_wise':
                    let restaurantId = JSON.parse(couponDiscount.data)
                    if (
                        Number.parseInt(restaurantId[0]) ===
                        restaurantData?.data?.id
                    ) {
                        if (
                            couponDiscount &&
                            couponDiscount.discount_type === 'amount'
                        ) {
                            if (couponDiscount.max_discount === 0) {
                                return couponDiscount.discount
                            } else {
                            }
                        } else {
                            let percentageWiseDis =
                                (purchasedAmount -
                                    getProductDiscount(
                                        cartList,
                                        restaurantData
                                    )) *
                                (couponDiscount.discount / 100)
                            if (couponDiscount.max_discount === 0) {
                                return percentageWiseDis
                            } else {
                                if (
                                    percentageWiseDis >=
                                    couponDiscount.max_discount
                                ) {
                                    return couponDiscount.max_discount
                                } else {
                                    return percentageWiseDis
                                }
                            }
                        }
                    } else {
                        return 0
                    }
                    break
                case 'free_delivery':
                    return 0
                case 'default':
                    if (
                        couponDiscount &&
                        couponDiscount.discount_type === 'amount'
                    ) {
                        if (couponDiscount.max_discount === 0) {
                            return couponDiscount.discount
                        } else {
                            return couponDiscount.discount
                        }
                    } else {
                        let percentageWiseDis =
                            (purchasedAmount -
                                getProductDiscount(cartList, restaurantData)) *
                            (couponDiscount.discount / 100)
                        if (couponDiscount.max_discount === 0) {
                            return percentageWiseDis
                        } else {
                            if (
                                percentageWiseDis >= couponDiscount.max_discount
                            ) {
                                return couponDiscount.max_discount
                            } else {
                                return percentageWiseDis
                            }
                        }
                    }
            }
        } else {
            return 0
        }
    }

    // let totalCouponDiscount = 0
    // if (cartList?.length > 0) {
    //     cartList.map((item) => {
    //         const order = item.price * item.quantity
    //         if (couponDiscount.coupon_type === 'free_delivery') {
    //             if (restaurantData.delivery_charge > 0) {
    //                 if (couponDiscount.min_purchase < order) {
    //                     restaurantData.free_delivery = true
    //                 } else {
    //                     alert('error')
    //                 }
    //             } else {
    //                 alert('error')
    //             }
    //         } else {
    //             if (
    //                 couponDiscount.min_purchase !== null &&
    //                 couponDiscount.min_purchase < order
    //             ) {
    //                 if ((couponDiscount.discount_type = 'percent')) {
    //                     if (
    //                         couponDiscount.max_discount !== null &&
    //                         couponDiscount.max_discount > 0
    //                     ) {
    //                         totalCouponDiscount =
    //                             (couponDiscount.discount * order) / 100 <
    //                             couponDiscount.max_discount
    //                                 ? (couponDiscount.discount * order) / 100
    //                                 : couponDiscount.discount
    //
    //                     } else {
    //                         totalCouponDiscount =
    //                             (couponDiscount.discount * order) / 100
    //                     }
    //                 } else {
    //                     totalCouponDiscount = couponDiscount.discount
    //                 }
    //             } else {
    //
    //             }
    //         }
    //         return totalCouponDiscount
    //     })
    //     return totalCouponDiscount
    // }
}
export const isAvailable = (start, end) => {
    const startTime = moment(start, 'HH:mm:ss')
    const endTime = moment(end, 'HH:mm:ss ')
    let currentTime = moment()
    return moment(currentTime).isBetween(startTime, endTime)
}

export const getDataLimit = (data) => {
    const tempData = data?.slice(0, 10).map((item) => item)
    return tempData
}
export const getCalculatedTotal = (
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
) => {
    if (couponDiscount) {
        if (couponDiscount?.coupon_type === 'free_delivery') {
            return (
                getSubTotalPrice(cartList) -
                getProductDiscount(cartList, restaurantData) +
                //here we check tex is included or exclude
                (global?.tax_included !== 1 &&
                    getTaxableTotalPrice(
                        cartList,
                        couponDiscount,
                        restaurantData
                    )) -
                (couponDiscount
                    ? getCouponDiscount(
                          couponDiscount,
                          restaurantData,
                          cartList
                      )
                    : 0)
            )
        } else {
            return (
                getSubTotalPrice(cartList) -
                getProductDiscount(cartList, restaurantData) +
                //here we check tex is included or exclude
                (global?.tax_included !== 1 &&
                    getTaxableTotalPrice(
                        cartList,
                        couponDiscount,
                        restaurantData
                    )) -
                (couponDiscount
                    ? getCouponDiscount(
                          couponDiscount,
                          restaurantData,
                          cartList
                      )
                    : 0) +
                getDeliveryFees(
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
                ) +
                deliveryTip
            )
        }
    } else {
        return (
            getSubTotalPrice(cartList) -
            getProductDiscount(cartList, restaurantData) +
            ///here we check tex is included or exclude
            (global?.tax_included !== 1 &&
                getTaxableTotalPrice(
                    cartList,
                    couponDiscount,
                    restaurantData
                )) -
            0 +
            getDeliveryFees(
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
                extraCharge && extraCharge
            ) +
            deliveryTip
        )
    }
}
// restaurant wise discount or products wise discount
export const getPriceByPriorityAndDiscount = (product) => {
    if (product.restaurant_discount === 0) {
        return getConvertDiscount(
            product.discount,
            product.discount_type,
            product.price
        )
    } else {
        let price =
            product.price - (product.price * product.restaurant_discount) / 100
        return getAmount(price)
    }
}
export const getDiscountForTag = (restaurantDiscount) => {
    let endDate = restaurantDiscount?.end_date
    let endTime = restaurantDiscount?.end_time
    let combinedEndDateTime = moment(
        `${endDate} ${endTime}`,
        'YYYY-MM-DD HH:mm:ss'
    ).format()
    let currentDateTime = moment().format()
    if (combinedEndDateTime > currentDateTime) {
        return restaurantDiscount?.discount
    }
    // return restaurantDiscount?.discount
}

export const getDiscountType = () => {}

export const isFoodAvailableBySchedule = (cart, selectedTime) => {
    // const startTime = moment(start, 'HH:mm:ss')
    // const endTime = moment(end, 'HH:mm:ss ')
    // let currentTime = moment()
    // return moment(currentTime).isBetween(startTime, endTime)

    if (selectedTime === 'now') {
        let currentTime = moment()
        if (cart.length > 0) {
            let isAvailable = cart.every((item) => {
                const startTime = moment(item.available_time_starts, 'HH:mm:ss')
                const endTime = moment(item.available_time_ends, 'HH:mm:ss')
                return moment(currentTime).isBetween(startTime, endTime)
            })
            return !!isAvailable
        }
    } else {
        if (selectedTime) {
            const slug = selectedTime.split(' ').pop()
            if (cart.length > 0) {
                const isAvailable = cart.every((item) => {
                    const startTime = moment(
                        item.available_time_starts,
                        'HH:mm:ss'
                    )
                    const endTime = moment(item.available_time_ends, 'HH:mm:ss')
                    const currentTime = moment(selectedTime, 'HH:mm:ss')
                    return moment(currentTime).isBetween(startTime, endTime)
                })
                return !!isAvailable
            }
        }
    }
}

export const FormatedDateWithTime = (date) => {
    let dateString = moment(date).format('YYYY-MM-DD hh:mm a')
    return dateString
}
export const restaurantDiscountTag = (
    restaurantDiscount,
    freeDelivery,
    currencySymbolDirection,
    currencySymbol,
    digitAfterDecimalPoint
) => {
    const off = t('% OFF')
    if (restaurantDiscount?.discount_type === 'percent') {
        return `${getDiscountForTag(restaurantDiscount)}${off}`
    }
    if (restaurantDiscount?.discount_type === 'amount') {
        return
        getAmount(
            restaurantDiscount.discount,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    } else if (freeDelivery) {
        return t('Free Delivery')
    } else return null
}

export const getIndexFromArrayByComparision = (arrayOfObjects, object) => {
    // for (let i = 0; i < arrayOfObjects.length; i++) {
    //     if (_.isEqual(arrayOfObjects[i].variations, object.variations)) {
    //         return i
    //     }
    // }
    return arrayOfObjects.findIndex(
        (item) =>
            _.isEqual(item.variations, object.variations) &&
            item.id === object.id
    )
}
export const handleTotalAmountWithAddons = (
    mainTotalAmount,
    selectedAddOns
) => {
    if (selectedAddOns?.length > 0) {
        let selectedAddonsTotalPrice = 0
        selectedAddOns.forEach(
            (item) => (selectedAddonsTotalPrice += item.price * item.quantity)
        )
        return mainTotalAmount + selectedAddonsTotalPrice
    } else {
        return mainTotalAmount
    }
}

export const cartItemsTotalAmount = (cartList) => {
    let totalAmount = 0
    if (cartList.length > 0) {
        cartList.forEach((item) => {
            totalAmount += handleTotalAmountWithAddons(
                item?.totalPrice,
                item?.selectedAddons
            )
        })
    }
    return totalAmount
}
export const calculateItemBasePrice = (item, selectedOptions) => {
    let basePrice = item?.price
    if (selectedOptions.length > 0) {
        selectedOptions?.forEach((option) => {
            if (option.isSelected === true) {
                basePrice += Number.parseInt(option?.optionPrice)
            }
        })
    }
    return basePrice
    // if(item)
}
export const maxCodAmount = (restaurantData, global, zoneData) => {
    if (zoneData?.data?.zone_data?.length > 0) {
        const resInfor = zoneData?.data?.zone_data?.find(
            (item) =>
                Number.parseInt(item.id) ===
                Number.parseInt(restaurantData?.data?.zone_id)
        )
        if (
            resInfor?.max_cod_order_amount !== null &&
            resInfor?.max_cod_order_amount !== 0
        ) {
            return resInfor?.max_cod_order_amount
        } else return 0
    }
}
export const foodCount = (productData) => {
    let itemCount = 0
    if (productData && productData?.length > 0) {
        productData?.forEach((product) => {
            if (
                product?.variations === null ||
                product?.variations[0]?.values ||
                product?.variations?.length === 0
            ) {
                return itemCount++
            }
        })
    } else {
        itemCount = 0
    }

    return itemCount
}
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { OrderFoodSubtitle } from '../checkout-page/CheckOut.style'

const VisibleVariations = (props) => {
    const { variations, t, orderDetailsColor } = props
    const [variationsWithChild, setVariationsWithChild] = useState([])
    const handleVariationsWithChild = (variations) => {
        const variationsArray = []
        if (variations.length > 0) {
            variations.forEach((variation) => {
                if (variation?.values?.length > 0) {
                    const selected = variation?.values?.filter(
                        (variationValue) => variationValue?.isSelected === true
                    )
                    if (selected.length > 0) {
                        const sArray = {
                            variationName: variation.name,
                            variationValues: selected,
                        }
                        variationsArray.push(sArray)
                    }

                }
            })
            setVariationsWithChild(variationsArray)
        }
    }
    useEffect(() => {
        handleVariationsWithChild(variations)
    }, [variations])
    return (
        <>
            {variationsWithChild.length > 0 && (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    flexWrap="wrap"
                >
                    <OrderFoodSubtitle orderdetailscolor={orderDetailsColor}>
                        {t('Variation')}
                    </OrderFoodSubtitle>
                    <OrderFoodSubtitle>:</OrderFoodSubtitle>
                    {variationsWithChild.map((item, parentIndex) => {
                        return (
                            <Stack direction="row" alignItems="center">
                                <OrderFoodSubtitle
                                    orderdetailscolor={orderDetailsColor}
                                >
                                    {item?.variationName}
                                </OrderFoodSubtitle>
                                {item?.variationValues?.length > 0 && (
                                    <OrderFoodSubtitle
                                        orderdetailscolor={orderDetailsColor}
                                    >
                                        (
                                        {item?.variationValues?.map(
                                            (val, index) =>
                                                `${val.label}${
                                                    index + 1 !==
                                                    item.variationValues.length
                                                        ? ','
                                                        : ''
                                                }`
                                        )}
                                        )
                                        {parentIndex + 1 !==
                                        variationsWithChild?.length
                                            ? ','
                                            : ''}
                                    </OrderFoodSubtitle>
                                )}
                            </Stack>
                        )
                    })}
                </Stack>
            )}
        </>
    )
}

VisibleVariations.propTypes = {}

export default VisibleVariations

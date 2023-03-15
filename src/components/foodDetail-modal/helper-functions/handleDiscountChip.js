import { OfferTypography } from '../../food-card/FoodCard.style'
import { getAmount } from '../../../utils/customFunctions'
import React from 'react'

export const handleDiscountChip = (
    product,
    t,
    currencySymbolDirection,
    currencySymbol,
    digitAfterDecimalPoint
) => {
    if (product?.restaurant_discount > 0) {
        return (
            <OfferTypography>
                {product?.restaurant_discount}% {t('OFF')}
            </OfferTypography>
        )
    } else {
        if (product.discount !== 0) {
            if (product?.discount_type === 'percent') {
                return (
                    <OfferTypography>
                        {product.discount}% {t('OFF')}
                    </OfferTypography>
                )
            } else {
                return (
                    <OfferTypography>
                        {getAmount(
                            product.discount,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </OfferTypography>
                )
            }
        }
    }
}

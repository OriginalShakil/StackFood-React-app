import VisibleVariations from '../floating-cart/VisibleVariations'
import React from 'react'

export const getVariationNames = (product, t) => {
    if (product?.variation?.length > 0) {
        if (product?.variation[0]?.values) {
            const modifiedVariation = product.variation.map((variation) => {
                return {
                    ...variation,
                    values:
                        variation?.values?.length > 0
                            ? variation?.values?.map((value) => ({
                                  ...value,
                                  isSelected: true,
                              }))
                            : [],
                }
            })

            return (
                <VisibleVariations
                    variations={modifiedVariation}
                    t={t}
                    orderDetailsColor="true"
                />
            )
        } else {
            //this portion is for showing previous structured variation
            let variationTitle = []
            let variationType = []
            if (product.food_details.choice_options.length > 0) {
                product.food_details.choice_options.forEach((co) =>
                    variationTitle.push(co.title)
                )
            }
            if (product.variation.length > 0) {
                product.variation.forEach((v) => variationType.push(v.type))
            }
            let variations = variationTitle.map(
                (item, index) =>
                    `${item} - ${variationType[index]} ${
                        index !== variationTitle.length - 1 ? ',' : ''
                    }`
            )
            return variations
        }
    }
}

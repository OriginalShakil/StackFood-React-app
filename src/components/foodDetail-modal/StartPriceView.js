import React from 'react'
import { Stack, Typography } from '@mui/material'
import { getAmount, getConvertDiscount } from '../../utils/customFunctions'
import {
    FoodTitleTypography,
    PricingCardActions,
} from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CustomTypography } from '../custom-tables/Tables.style'
import { Box } from '@mui/system'

const StartPriceView = (props) => {
    const { data, hideStartFromText,fontSize,marginFoodCard } = props
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const handleConvertedPrice = () => {
        if (data?.restaurant_discount === 0) {
            return getAmount(
                getConvertDiscount(
                    data.discount,
                    data.discount_type,
                    data.price,
                    data.restaurant_discount
                ),
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        } else {
            let price =
                data.price - (data.price * data.restaurant_discount) / 100
            return getAmount(
                price,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        }
    }


    const handleDiscountedPriceView = () => {

        if (data.discount > 0) {
            return (
                <CustomTypography
                    variant={fontSize?fontSize : "h4"}
                    sx={{
                        color: 'red',
                        textDecoration: 'line-through',
                        mr: languageDirection==="rtl" ? "0px":1,

                    }}
                >
                    {data?.price > 0 &&
                        getAmount(
                            data.price,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                </CustomTypography>
            )
        }
    }
    return (
        <PricingCardActions
            disableSpacing
            sx={{ margin: '0', padding: '10px 0' }}
            discount={data?.discount}

        >
            <Stack direction="row" spacing={0.5} alignItems="center" textAlign="right">
                {hideStartFromText !== 'true' && (
                    <FoodTitleTypography
                        variant={{ xs: 'h6', md: 'h5' }}
                        display="block"
                        fontWeight={500}
                        sx={{ marginRight: '5px' }}
                    >
                        {t('Starts from')} :
                    </FoodTitleTypography>
                )}

                {data.price === handleConvertedPrice() ? (
                    <FoodTitleTypography
                        display="block"
                        fontWeight={500}
                        fontSize="22px"

                    >
                        {getAmount(
                            data.price,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </FoodTitleTypography>
                ) : (
                    <Stack direction="row" spacing={0.2} alignItems="center">
                        {handleDiscountedPriceView()}

                        <Stack>
                            <CustomTypography
                                variant={fontSize ? fontSize :"h4"}
                                sx={{ mb: data?.discount > 0 ? '7px':marginFoodCard }}
                            >
                                {handleConvertedPrice()}
                            </CustomTypography>
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </PricingCardActions>
    )
}

StartPriceView.propTypes = {}

export default StartPriceView

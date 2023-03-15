import React from 'react'
import { getAmount } from '../../../utils/customFunctions'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
const Wrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '200px',
    width: '100%',
}))
const InnerBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
}))

const DiscountBannerSection = ({ discountBanner, discount }) => {
    const { discountE } = discount
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const theme = useTheme()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const discountTime= t("Discount available from")
    const discountPercent=t("% off on all foods")
    const enjoy=t("Enjoy")
    const min =t("Minimum purchase value")
    const max=t("Max Discount")
    return (
        <>
            <Wrapper>
                <img src={discountBanner.src} height="100%" width="100%" />
                <InnerBox>
                    {discount && (
                        <CustomStackFullWidth
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CustomColouredTypography
                                color={theme.palette.neutral[100]}
                                variant="h2"
                            >
                                {t(
                                    `${enjoy} ${discount?.discount?.discount}${discountPercent}`
                                )}
                            </CustomColouredTypography>
                            <CustomColouredTypography
                                color={theme.palette.neutral[100]}
                                variant="h3"
                            >
                                {t(
                                    `${discountTime} ${discount?.discount?.start_time} -
                                ${discount?.discount?.end_time}`
                                )}
                            </CustomColouredTypography>
                            <CustomStackFullWidth
                                alignItems="center"
                                justifyContent="center"
                                mt="1rem"
                            >
                                <CustomColouredTypography
                                    color={theme.palette.neutral[100]}
                                    variant="h4"
                                >
                                    {t(
                                        `${min} : ${getAmount(
                                            discount?.discount?.min_purchase,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}`
                                    )}
                                </CustomColouredTypography>
                                <CustomColouredTypography
                                    color={theme.palette.neutral[100]}
                                    variant="h4"
                                >
                                    {t(
                                        `${max} :
                                ${getAmount(
                                    discount?.discount?.max_discount,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}`
                                    )}
                                </CustomColouredTypography>
                            </CustomStackFullWidth>
                        </CustomStackFullWidth>
                    )}
                </InnerBox>
            </Wrapper>
        </>
    )
}

export default DiscountBannerSection

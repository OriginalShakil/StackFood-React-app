import React, { useState } from 'react'
import {
    Grid,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Tooltip,
    Card,
    Stack, alpha,
} from '@mui/material'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import img from '../../../../public/static/coupon.png'
import { CouponApi } from '../../../hooks/react-query/config/couponApi'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useTranslation } from 'react-i18next'
import { CouponCard } from '../profile/Profile.style'
import CustomShimmerCard from '../../customShimmerForProfile/CustomShimmerCard'
import { Button } from '@material-ui/core'
import { useTheme } from '@mui/material/styles'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import CustomImageContainer from '../../CustomImageContainer'
import { getAmount } from '../../../utils/customFunctions'
import { useSelector } from 'react-redux'
import noData from '../../../../public/static/nodata.png'
import { onSingleErrorResponse } from '../../ErrorResponse'

const CouponList = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['coupon-list'],
        CouponApi.couponList,
        {
            onError: onSingleErrorResponse,
        }
    )

    const copyCouponCode = async (text) => {
        if (typeof window !== undefined) {
            await window.navigator.clipboard.writeText(text)
        }
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CustomShimmerCard />
            </Box>
        )
    }
    // function copy(text) {
    //     navigator.clipboard.writeText(text)
    // }
    const handleTooltipClose = () => {
        setTooltipOpen(false)
    }

    const handleTooltipOpen = async (coupon_code) => {
        setTooltipOpen(true)
        await copyCouponCode(coupon_code)
        toast.success(t(' Coupon code Copied '))
    }
    const only = t('Only For')
    const couponType = (coupon) => {
        if (coupon?.coupon_type === 'restaurant_wise') {
            return (
                <Typography
                    fontSize="13px"
                    textTransform="capitalize"
                >{only} {" "}
                <Typography component="span"
                            fontSize="14px"
                            fontWeight="700"
                            textTransform="capitalize" >
                    {coupon?.data}
                </Typography>
                </Typography>
            )
        }
        if (coupon.coupon_type === 'default') {
            return (
                <>
                    {coupon?.restaurant &&
                        <Typography
                        fontSize="13px"
                        textTransform="capitalize"
                    >{only} {" "}
                        <Typography component="span"
                                    fontSize="14px"
                                    fontWeight="700"
                                    textTransform="capitalize" >
                            {coupon?.restaurant?.name}
                        </Typography>
                    </Typography>}
                </>

            )
        }
        if (coupon?.coupon_type === 'zone_wise') {
            return (
                <Typography fontSize="13px" textTransform="capitalize">
                    {t('Only for some specific zones')}
                </Typography>
            )
        }
        if (coupon?.coupon_type === 'free_delivery') {
            return (
                <Typography fontSize="13px" textTransform="capitalize">
                    {coupon?.coupon_type.replaceAll('_', ' ')}
                </Typography>
            )
        }
    }
const borderColor=alpha(theme.palette.primary.main)
    return (
        <Box mt="2rem" minHeight="40vh">
            <Grid container spacing={2}>
                {data?.data?.map((coupon) => (
                    <Grid item sm={6} xs={12}>
                        <Card
                            sx={{
                                // background: '#FFFFFF',
                                border: `1px solid ${borderColor}`,
                                borderRadius: '10px',
                                textAlign: 'center',
                                height: '100%',
                            }}
                        >
                            <Grid container item md={12} xs={12} height="100%">
                                <Grid
                                    item
                                    md={4}
                                    xs={4}

                                    // sx={{ background: '#FFF5ED' }}
                                >
                                    <Box
                                        sx={{
                                            background:
                                                alpha(theme.palette.primary.main,.2),
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        maxWidth="110px"
                                        height="100%"
                                    >
                                        {/*<CustomImageContainer src={img.src} />*/}
                                        <img
                                            src={img.src}
                                            alt={t(coupon.discount)}
                                            height={50}
                                        />
                                        <Typography
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                                fontSize: '15px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {coupon.coupon_type ===
                                            'free_delivery'
                                                ? 'Free Delivery'
                                                : coupon.discount_type ===
                                                  'percent'
                                                ? `${coupon.discount} %`
                                                : getAmount(
                                                      coupon.discount,
                                                      currencySymbolDirection,
                                                      currencySymbol,
                                                      digitAfterDecimalPoint
                                                  )}{' '}
                                            {coupon.coupon_type ===
                                            'free_delivery'
                                                ? ''
                                                : t('Off')}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    md={7}
                                    xs={7}
                                    sx={{ padding: '10px' }}
                                    textAlign={{ xs: 'left', md: 'center' }}
                                >
                                    <Typography
                                        fontWeight="700"
                                        fontSize="14px"
                                        textTransform="uppercase"
                                    >
                                        {coupon.code} ({coupon.title})
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {t('Expired on')} : {coupon.expire_date}
                                    </Typography>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 0, md: 1 }}
                                        flexWrap="wrap"
                                        justifyContent={{
                                            xs: 'flex-start',
                                            md: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                color: (theme) =>
                                                    theme.palette.neutral[400],
                                            }}
                                        >
                                            {' '}
                                            {t('Min')} {t('Purchase')} :{' '}
                                            <Typography
                                                component="span"
                                                fontSize="12px"
                                                fontWeight="700"
                                            >
                                                {getAmount(
                                                    coupon.min_purchase,
                                                    currencySymbolDirection,
                                                    currencySymbol,
                                                    digitAfterDecimalPoint
                                                )}
                                            </Typography>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                color: (theme) =>
                                                    theme.palette.neutral[400],
                                            }}
                                        >
                                            {t('Max')} {t('Purchase')} :{' '}
                                            <Typography
                                                fontSize="12px"
                                                component="span"
                                                fontWeight="700"
                                            >
                                                {getAmount(
                                                    coupon.max_discount,
                                                    currencySymbolDirection,
                                                    currencySymbol,
                                                    digitAfterDecimalPoint
                                                )}
                                            </Typography>
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        // sx={{
                                        //     fontSize: '12px',
                                        //     color:" #9B9B9B",
                                        //
                                        //     overflow: "hidden",
                                        //     textOverflow: "ellipsis",
                                        //     display: "-webkit-box",
                                        //     WebkitLineClamp: "1",
                                        //     WebkitBoxOrient: "vertical",
                                        //     textTransform:"capitalize"
                                        //
                                        // }}
                                        fontSize="13px"
                                        color="#9B9B9B"
                                        fontWeight="700"
                                    >
                                        {couponType(coupon)}
                                    </Typography>
                                </Grid>
                                <Grid item md={1} xs={1}>
                                    <ClickAwayListener
                                        onClickAway={handleTooltipClose}
                                    >
                                        <Tooltip
                                            placement="top"
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={handleTooltipClose}
                                            open={tooltipOpen}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title={t('Copied')}
                                        >
                                            {/*<Button onClick={handleTooltipOpen}>Click</Button>*/}
                                            <IconButton
                                                onClick={() =>
                                                    handleTooltipOpen(
                                                        coupon.code
                                                    )
                                                }
                                            >
                                                <ContentCopyIcon
                                                    sx={{
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                    style={{ fontSize: 16 }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </ClickAwayListener>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
                {data.data.length === 0 && (
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        width="100%"

                    >
                        <CustomEmptyResult
                            label="No Coupon Found"
                            image={noData}
                        />
                    </Stack>
                )}
            </Grid>
        </Box>
    )
}

export default CouponList

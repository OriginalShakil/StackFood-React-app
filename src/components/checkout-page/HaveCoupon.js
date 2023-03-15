import React, { useEffect, useState } from 'react'
import { Grid, InputBase } from '@mui/material'
import {
    CouponButton,
    CouponGrid,
    CouponTitle,
    InputField,
} from './CheckOut.style'
import { useQuery } from 'react-query'
import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { useTranslation } from 'react-i18next'
import { onErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCouponInfo, setCouponType } from '../../redux/slices/global'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {useTheme} from "@mui/material/styles";

const HaveCoupon = ({ restaurant_id, setCouponDiscount, couponDiscount }) => {
    const theme=useTheme()
    const [couponCode, setCouponCode] = useState(null)
    const [zoneId, setZoneId] = useState(0)

    const [enable, setEnable] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleSuccess = (response) => {
        dispatch(setCouponInfo(response.data))
        toast.success(t('Coupon Applied'))
        dispatch(setCouponType(response.data.coupon_type))
        setCouponDiscount({ ...response.data, zoneId: zoneId })

        if (typeof window !== 'undefined') {
            if (response) {
                localStorage.setItem('coupon', response.data.code)
            }
        }
    }
    const { isLoading, refetch } = useQuery(
        'apply-coupon',
        () => CouponApi.applyCoupon(couponCode, restaurant_id),
        {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
            enabled: false,
        }
    )

    let couponStorage = undefined
    if (typeof window !== 'undefined') {
        couponStorage = localStorage.getItem('coupon')
    }
    useEffect(() => {
        setCouponCode(couponStorage)
        if (typeof window !== 'undefined') {
            let zoneid = JSON.parse(localStorage.getItem('zoneid'))

            setZoneId(zoneid[0])
        }

        if (couponStorage) {
            setEnable(true)
        }
        return () => {
            localStorage.removeItem('coupon')
        }
    }, [])
    const removeCoupon = () => {
        setCouponDiscount(null)
        localStorage.removeItem('coupon')
        setCouponCode(null)
        //dispatch(setCouponInfo(null))
    }
    const handleApply = () => {
        refetch().then()
    }
    const borderColor=theme.palette.primary.main
    return (
        <CustomPaperBigCard>
            <Grid container spacing={{xs:1,md:2}} justifyContent="flex-start">
                <Grid item md={12} xs={12}>
                    <CouponTitle>{t('Have a Coupon?')}</CouponTitle>
                </Grid>
                <Grid item md={6} xs={12} sm={7}>
                    <InputField variant="outlined" sx={{border:`.5px solid ${borderColor}`,}}>
                        <InputBase
                            placeholder={t("Enter Your Coupon..")}
                            sx={{ ml: 1, flex: 1,
                                width:"100%"
                                ,
                                [theme.breakpoints.down('sm')]: {
                                fontSize:"12px",
                                    padding:"5px 0px 5px"
                            }}}
                            onChange={(e) => setCouponCode(e.target.value)}
                            value={couponCode ? couponCode : ''}
                        />
                    </InputField>
                </Grid>
                <Grid item md={3} xs={12} sm={5}>
                    {!couponStorage && (
                        <CouponButton
                            loading={isLoading}
                            loadingPosition="start"
                            variant="contained"
                            onClick={handleApply}
                            disabled={couponCode === '' || !couponCode}
                        >
                            {t('Apply Now')}
                        </CouponButton>
                    )}
                    {couponStorage && (
                        <CouponButton
                            // loading={isLoading}
                            loadingPosition="start"
                            variant="contained"
                            onClick={removeCoupon}
                        >
                            {t('Remove')}
                        </CouponButton>
                    )}
                </Grid>
            </Grid>
        </CustomPaperBigCard>
    )
}
export default HaveCoupon

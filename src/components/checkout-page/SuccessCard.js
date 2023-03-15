import React, { useEffect, useState } from 'react'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setClearCart } from '../../redux/slices/cart'
import { useTranslation } from 'react-i18next'
import { Stack } from '@mui/material'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import { getNumberWithConvertedDecimalPoint } from '../../utils/customFunctions'
export default function SuccessCard({ totalAmount }) {
    const { global } = useSelector((state) => state.globalSettings)
    const [orderAmount, setOrderAmount] = useState(null)
    const router = useRouter()
    const dispatch = useDispatch()
    dispatch(setClearCart())
    const { t } = useTranslation()
    useEffect(() => {
        if (typeof window !== undefined) {
            setOrderAmount(localStorage.getItem('totalAmount'))
        }
    }, [])

    const handlePoints = () => {
        if (orderAmount && global.loyalty_point_status === 1) {
            return getNumberWithConvertedDecimalPoint(
                (orderAmount / 100) * global.loyalty_point_item_purchase_point,
                global.digit_after_decimal_point
            )
        }
    }
    return (
        <CustomStackFullWidth
            height="100%"
            alignItems="center"
            justifyContent="center"
            spacing={2}
        >
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <Typography
                    align="center"
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {t('You place the order successfully.')}
                </Typography>
                <Typography
                    align="center"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    {t(
                        'Your order is placed Successfully. We start our delivery process and you will receive your food soon.'
                    )}
                </Typography>
                {global?.loyalty_point_status === 1 && (
                    <CustomStackFullWidth
                        alignItems="center"
                        // justifyContent="center"
                    >
                        <CustomColouredTypography color="primary" variant="h3">
                            {t('Congratulations!')}
                        </CustomColouredTypography>
                        <Stack
                            width="100%"
                            alignItems="center"
                            justifyContent="center"
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                        >
                            <Typography align="center" variant="body2">
                                {t('You have earned')}
                            </Typography>
                            <CustomTypography align="center" variant="body2">
                                {handlePoints()}
                            </CustomTypography>
                            <Typography align="center" variant="body2">
                                {t('point.')}
                            </Typography>
                            <Typography align="center" variant="body2">
                                {t(
                                    'It will add to your balance when the order is delivered.'
                                )}
                            </Typography>
                        </Stack>
                    </CustomStackFullWidth>
                )}
                <Stack pt="2rem">
                    <Button
                        onClick={() => router.push('/home')}
                        variant="contained"
                    >
                        {t('Back to home')}
                    </Button>
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

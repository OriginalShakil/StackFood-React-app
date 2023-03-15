import React from 'react'
import PropTypes from 'prop-types'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomPaperCard } from '../custom-cards/CustomCards.style'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { setClearCart } from '../../redux/slices/cart'

const CheckoutFailedCard = (props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleOrderFail = () => {
        dispatch(setClearCart())
        Router.push('/home')
    }
    return (
        <CustomPaperCard>
            <Stack
                width="100%"
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <Typography>
                    {t('Are you agree with this order fail?')}
                </Typography>
                <Button variant="contained" fullWidth onClick={handleOrderFail}>
                    {t('Switch to Cash On Delivery')}
                </Button>
                <Button variant="contained" fullWidth onClick={handleOrderFail}>
                    {t('Continue with Order Fail')}
                </Button>
            </Stack>
        </CustomPaperCard>
    )
}

CheckoutFailedCard.propTypes = {}

export default CheckoutFailedCard

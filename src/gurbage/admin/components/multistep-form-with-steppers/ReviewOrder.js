import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Grid, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CustomContentWrapper } from './MultistepFormsWithStepper.style'
import { CustomColouredTypography } from '../../../../styled-components/CustomStyles.style'
import {
    CustomButtonGray,
    CustomButtonSuccess,
} from '../../../../styled-components/CustomButtons.style'

const ReviewOrder = (props) => {
    const { onNext, onBack } = props
    const { t } = useTranslation()
    const { addressForm, paymentForm } = useSelector(
        (state) => state.multiStepForm
    )
    return (
        <Box>
            {' '}
            <Typography variant="h3">{t('Review Your Order')}</Typography>
            <CustomContentWrapper>
                <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                        <Stack spacing={2}>
                            <CustomColouredTypography variant="h2">
                                {t('Shipping Address')}
                            </CustomColouredTypography>
                            <Typography variant="h4">
                                {t('First Name')} : {addressForm.f_name}{' '}
                            </Typography>
                            <Typography variant="h4">
                                {t('Last Name')} : {addressForm.l_name}{' '}
                            </Typography>
                            <Typography variant="h4">
                                {t('Address')} : {addressForm.address}{' '}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Stack spacing={2}>
                            <CustomColouredTypography variant="h2">
                                {t('Payment Details')}
                            </CustomColouredTypography>
                            <Typography variant="h4">
                                {t('Name on card')} : {paymentForm.name_on_card}{' '}
                            </Typography>
                            <Typography variant="h4">
                                {t('Card Number')} : {paymentForm.card_number}{' '}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                            alignItems="center"
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            width="100%"
                        >
                            <CustomButtonGray onClick={onBack}>
                                {t('Back')}
                            </CustomButtonGray>
                            <CustomButtonSuccess onClick={onNext}>
                                {t('Place Order')}
                            </CustomButtonSuccess>
                        </Stack>
                    </Grid>
                </Grid>
            </CustomContentWrapper>
        </Box>
    )
}

ReviewOrder.propTypes = {}

export default ReviewOrder

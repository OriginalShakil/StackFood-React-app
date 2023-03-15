import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Typography from '@mui/material/Typography'
import { CustomContentWrapper } from '../MultistepFormsWithStepper.style'
import { Grid, Stack, TextField } from '@mui/material'
import {
    CustomButtonGray,
    CustomButtonSuccess,
} from '../../../../../styled-components/CustomButtons.style'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentForm } from '../../../../../redux/slices/multiStepForm'

const PaymentForm = (props) => {
    const { onNext, onBack } = props
    const { paymentForm } = useSelector((state) => state.multiStepForm)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const paymentFormWithFormik = useFormik({
        initialValues: {
            name_on_card: paymentForm.name_on_card,
            card_number: paymentForm.card_number,
        },
        validationSchema: Yup.object({
            name_on_card: Yup.string().required(t('This field is required')),
            card_number: Yup.number().required(t('This field is required')),
        }),
        onSubmit: async (values, helpers) => {
            try {
                dispatch(setPaymentForm(values))
                onNext()
            } catch (err) {

            }
        },
    })
    return (
        <Box>
            <Typography variant="h3">{t('Payment Method')}</Typography>
            <CustomContentWrapper>
                <form onSubmit={paymentFormWithFormik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label={t('Name on card')}
                                id="name_on_card"
                                error={Boolean(
                                    paymentFormWithFormik.touched
                                        .name_on_card &&
                                        paymentFormWithFormik.errors
                                            .name_on_card
                                )}
                                helperText={
                                    paymentFormWithFormik.touched
                                        .name_on_card &&
                                    paymentFormWithFormik.errors.name_on_card
                                }
                                onBlur={paymentFormWithFormik.handleBlur}
                                onChange={paymentFormWithFormik.handleChange}
                                type="text"
                                value={paymentFormWithFormik.values.first_name}
                                {...paymentFormWithFormik.getFieldProps(
                                    'name_on_card'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label={t('Card Number')}
                                id="card_number"
                                error={Boolean(
                                    paymentFormWithFormik.touched.card_number &&
                                        paymentFormWithFormik.errors.card_number
                                )}
                                helperText={
                                    paymentFormWithFormik.touched.card_number &&
                                    paymentFormWithFormik.errors.card_number
                                }
                                onBlur={paymentFormWithFormik.handleBlur}
                                onChange={paymentFormWithFormik.handleChange}
                                type="number"
                                value={paymentFormWithFormik.values.card_number}
                                {...paymentFormWithFormik.getFieldProps(
                                    'card_number'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                width="100%"
                            >
                                <CustomButtonGray maxWidth onClick={onBack}>
                                    {t('Back')}
                                </CustomButtonGray>
                                <CustomButtonSuccess type="submit">
                                    {t('Next')}
                                </CustomButtonSuccess>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </CustomContentWrapper>
        </Box>
    )
}

PaymentForm.propTypes = {}

export default PaymentForm

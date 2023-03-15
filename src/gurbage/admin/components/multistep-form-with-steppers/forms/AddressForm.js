import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Grid, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
    CustomBoxFlexEnd,
    CustomContentWrapper,
} from '../MultistepFormsWithStepper.style'
import { CustomButtonSuccess } from '../../../../../styled-components/CustomButtons.style'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressForm } from '../../../../../redux/slices/multiStepForm'

const AddressForm = (props) => {
    const { onNext } = props
    const { addressForm } = useSelector((state) => state.multiStepForm)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const addressFormWithFormik = useFormik({
        initialValues: {
            first_name: addressForm.f_name,
            last_name: addressForm.l_name,
            address: addressForm.address,
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required(t('First name is required')),
            last_name: Yup.string().required(t('Last name is required')),
            address: Yup.string().required(t('Address is required')),
        }),
        onSubmit: async (values, helpers) => {
            try {
                dispatch(setAddressForm(values))
                onNext()
            } catch (err) {

            }
        },
    })
    return (
        <Box>
            <Typography variant="h3">{t('Address Form')}</Typography>
            <CustomContentWrapper>
                <form onSubmit={addressFormWithFormik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label={t('First Name')}
                                id="firstname"
                                error={Boolean(
                                    addressFormWithFormik.touched.first_name &&
                                        addressFormWithFormik.errors.first_name
                                )}
                                helperText={
                                    addressFormWithFormik.touched.first_name &&
                                    addressFormWithFormik.errors.first_name
                                }
                                onBlur={addressFormWithFormik.handleBlur}
                                onChange={addressFormWithFormik.handleChange}
                                type="text"
                                value={addressFormWithFormik.values.first_name}
                                {...addressFormWithFormik.getFieldProps(
                                    'first_name'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label={t('Last Name')}
                                id="lastname"
                                error={Boolean(
                                    addressFormWithFormik.touched.last_name &&
                                        addressFormWithFormik.errors.last_name
                                )}
                                helperText={
                                    addressFormWithFormik.touched.last_name &&
                                    addressFormWithFormik.errors.last_name
                                }
                                onBlur={addressFormWithFormik.handleBlur}
                                onChange={addressFormWithFormik.handleChange}
                                type="text"
                                value={addressFormWithFormik.values.last_name}
                                {...addressFormWithFormik.getFieldProps(
                                    'last_name'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                multiline
                                rows={2}
                                fullWidth
                                label={t('Address')}
                                id="address"
                                error={Boolean(
                                    addressFormWithFormik.touched.address &&
                                        addressFormWithFormik.errors.address
                                )}
                                helperText={
                                    addressFormWithFormik.touched.address &&
                                    addressFormWithFormik.errors.address
                                }
                                onBlur={addressFormWithFormik.handleBlur}
                                onChange={addressFormWithFormik.handleChange}
                                type="text"
                                value={addressFormWithFormik.values.address}
                                {...addressFormWithFormik.getFieldProps(
                                    'address'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <CustomBoxFlexEnd>
                                <CustomButtonSuccess type="submit">
                                    {t('Next')}
                                </CustomButtonSuccess>
                            </CustomBoxFlexEnd>
                        </Grid>
                    </Grid>
                </form>
            </CustomContentWrapper>
        </Box>
    )
}

AddressForm.propTypes = {}

export default AddressForm

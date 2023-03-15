import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Stack } from '@mui/material'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import { getAmount } from '../../utils/customFunctions'
import { CustomTypographyGray } from '../error/Errors.style'
import Divider from '@mui/material/Divider'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { ReviewApi } from './ReviewApi'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { onErrorResponse } from '../ErrorResponse'
import { CustomTypography } from '../custom-tables/Tables.style'

const DeliverymanForm = ({ data, orderId }) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const productImage = global?.base_urls?.delivery_man_image_url
    const { mutate, isLoading, error } = useMutation(
        'submit-review-deliveryman',
        ReviewApi.deliveryman
    )
    const formik = useFormik({
        initialValues: {
            rating: '',
            comment: '',
        },
        onSubmit: async (values, helpers) => {
            try {
                handleFormsubmit(values)
            } catch (err) {

            }
        },
    })
    const handleChangeRatings = (value) => {
        formik.setFieldValue('rating', value)
    }
    const handleFormsubmit = (values) => {
        const formData = {
            ...values,
            delivery_man_id: data?.id,
            order_id: orderId,
        }
        mutate(formData, {
            onSuccess: (response) => {
                toast.success(response?.data?.message)
            },
            onError: onErrorResponse,
        })
    }
    return (
        <CustomStackFullWidth>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <CustomStackFullWidth
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomImageContainer
                                    src={`${productImage}/${data?.image}`}
                                    width="100px"
                                    height="90px"
                                />
                                <Stack>
                                    <CustomTypographyBold>
                                        {data?.f_name.concat(' ', data?.l_name)}
                                    </CustomTypographyBold>
                                    <CustomRatings
                                        readOnly={true}
                                        handleChangeRatings={
                                            handleChangeRatings
                                        }
                                        ratingValue={data?.rating_count}
                                    />
                                </Stack>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center">
                            <CustomTypographyGray sx={{ fontSize: '18px' }}>
                                {t('Rate the deliveryman')}
                            </CustomTypographyGray>
                            <CustomRatings
                                handleChangeRatings={handleChangeRatings}
                                ratingValue={formik.values.rating}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center" spacing={1}>
                            <CustomTypographyGray sx={{ fontSize: '18px' }}>
                                {t('Share your opinion')}
                            </CustomTypographyGray>
                            <CustomTextFieldWithFormik
                                type="text"
                                label={t('Comment')}
                                touched={formik.touched.comment}
                                errors={formik.errors.comment}
                                fieldProps={formik.getFieldProps('comment')}
                                multiline
                                rows={2}
                                // onChangeHandler={RestaurantNameHandler}
                                value={formik.values.comment}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} mt="1rem">
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            type="submit"
                            loading={isLoading}
                            // sx={{ width: '100%' }}
                        >
                            {t('Submit')}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </CustomStackFullWidth>
    )
}

DeliverymanForm.propTypes = {}

export default DeliverymanForm

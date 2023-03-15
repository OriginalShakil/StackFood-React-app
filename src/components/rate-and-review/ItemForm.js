import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import SignUpValidation from '../auth/SignUpValidation'
import {
    CustomColouredTypography,
    CustomFullDivider,
    CustomStackFullWidth,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import { Grid, Stack } from '@mui/material'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import { CustomTypographyGray } from '../error/Errors.style'
import CustomRatings from '../custom-ratings/CustomRatings'
import Divider from '@mui/material/Divider'
import CustomImageContainer from '../CustomImageContainer'
import { useSelector } from 'react-redux'
import { getAmount } from '../../utils/customFunctions'
import { useMutation } from 'react-query'
import { AuthApi } from '../../hooks/react-query/config/authApi'
import { setToken } from '../../redux/slices/global'
import toast from 'react-hot-toast'
import { setWishList } from '../../redux/slices/wishList'
import { ReviewApi } from './ReviewApi'
import { onErrorResponse } from '../ErrorResponse'

const ItemForm = ({ data }) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const productImage = global?.base_urls?.product_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { mutate, isLoading, error } = useMutation(
        'submit-review',
        ReviewApi.submit
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
            delivery_man_id: null,
            food_id: data?.food_id,
            order_id: data?.order_id,
        }
        mutate(formData, {
            onSuccess: (response) => {
                toast.success(response?.data?.message)
            },
            onError: onErrorResponse,
        })
    }
    const languageDirection = localStorage.getItem('direction')
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
                                gap={languageDirection==="rtl"?"1rem":"0rem"}
                            >
                                <CustomImageContainer
                                    src={`${productImage}/${data?.food_details?.image}`}
                                    width="100px"
                                    height="90px"
                                />
                                <Stack>
                                    <CustomTypographyBold>
                                        {data?.food_details?.name}
                                    </CustomTypographyBold>
                                    <CustomTypographyBold>
                                        {getAmount(
                                            data?.food_details?.price,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                    </CustomTypographyBold>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <CustomTypographyGray sx={{ fontSize: '18px' }}>
                                    {t('Quantity')}
                                </CustomTypographyGray>
                                <CustomTypographyGray sx={{ fontSize: '18px' }}>
                                    :
                                </CustomTypographyGray>
                                <CustomColouredTypography
                                    color="primary.main"
                                    sx={{ fontSize: '18px' }}
                                >
                                    {data?.quantity}
                                </CustomColouredTypography>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center">
                            <CustomTypographyGray sx={{ fontSize: '18px' }}>
                                {t('Rate the food')}
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

ItemForm.propTypes = {}

export default ItemForm

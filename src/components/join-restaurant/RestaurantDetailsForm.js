import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Grid } from '@mui/material'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import { useTranslation } from 'react-i18next'

const RestaurantDetailsForm = ({
    RestaurantJoinFormik,
    RestaurantNameHandler,
    RestaurantAddressHandler,
}) => {
    const { t } = useTranslation()
    return (
        <CustomStackFullWidth alignItems="center">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Restaurant Name')}
                        touched={RestaurantJoinFormik.touched.restaurant_name}
                        errors={RestaurantJoinFormik.errors.restaurant_name}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'restaurant_name'
                        )}
                        onChangeHandler={RestaurantNameHandler}
                        value={RestaurantJoinFormik.values.restaurant_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Restaurant Address')}
                        touched={
                            RestaurantJoinFormik.touched.restaurant_address
                        }
                        errors={RestaurantJoinFormik.errors.restaurant_address}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'restaurant_address'
                        )}
                        onChangeHandler={RestaurantAddressHandler}
                        value={RestaurantJoinFormik.values.restaurant_address}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="number"
                        label={t('VAT/TAX')}
                        touched={RestaurantJoinFormik.touched.vat}
                        errors={RestaurantJoinFormik.errors.vat}
                        fieldProps={RestaurantJoinFormik.getFieldProps('vat')}
                        onChangeHandler={RestaurantAddressHandler}
                        value={RestaurantJoinFormik.values.vat}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="number"
                            label={t('Minimum Delivery Time')}
                        touched={RestaurantJoinFormik.touched.min_delivery_time}
                        errors={RestaurantJoinFormik.errors.min_delivery_time}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'min_delivery_time'
                        )}
                        onChangeHandler={RestaurantNameHandler}
                        value={RestaurantJoinFormik.values.min_delivery_time}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="number"
                        label={t('Maximum Delivery Time')}
                        touched={RestaurantJoinFormik.touched.max_delivery_time}
                        errors={RestaurantJoinFormik.errors.max_delivery_time}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'max_delivery_time'
                        )}
                        onChangeHandler={RestaurantNameHandler}
                        value={RestaurantJoinFormik.values.max_delivery_time}
                    />
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    )
}
export default RestaurantDetailsForm

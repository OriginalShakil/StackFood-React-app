import React from 'react'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Stack, Typography } from '@mui/material'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import CustomPhoneInput from '../CustomPhoneInput'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const OwnerForm = ({
    RestaurantJoinFormik,
    fNameHandler,
    lNameHandler,
    phoneHandler,
}) => {
    const { t } = useTranslation()
    const { global, token } = useSelector((state) => state.globalSettings)
    return (
        <CustomBoxFullWidth>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} align="center">
                    <Typography>{t('Owner Information')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('First Name')}
                        touched={RestaurantJoinFormik.touched.f_name}
                        errors={RestaurantJoinFormik.errors.f_name}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'f_name'
                        )}
                        onChangeHandler={fNameHandler}
                        value={RestaurantJoinFormik.values.f_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Last Name')}
                        touched={RestaurantJoinFormik.touched.l_name}
                        errors={RestaurantJoinFormik.errors.l_name}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'l_name'
                        )}
                        onChangeHandler={lNameHandler}
                        value={RestaurantJoinFormik.values.l_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomPhoneInput
                        initCountry={global?.country}
                        value={RestaurantJoinFormik.values.phone}
                        onHandleChange={phoneHandler}
                        touched={RestaurantJoinFormik.touched.phone}
                        errors={RestaurantJoinFormik.errors.phone}
                    />
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default OwnerForm

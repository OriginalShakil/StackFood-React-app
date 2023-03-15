import React from 'react'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Typography } from '@mui/material'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import { useTranslation } from 'react-i18next'

const RestaurantLoginForm = ({
    RestaurantJoinFormik,
    emailHandler,
    passwordHandler,
}) => {
    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomBoxFullWidth>
            <CustomStackFullWidth alignItems="center" mb="1.5rem" mt="1rem">
                <Typography>{t('Login Information')}</Typography>
            </CustomStackFullWidth>
            <Grid container>
                <CustomStackFullWidth
                    direction={{ xs: 'column', sm: 'row', md: 'row' }}
                    alignItems="center"
                    spacing={5}
                    mb="1.5rem"
                >
                    <CustomTextFieldWithFormik
                        required="true"
                        type="email"
                        label={t('Email')}
                        touched={RestaurantJoinFormik.touched.email}
                        errors={RestaurantJoinFormik.errors.email}
                        fieldProps={RestaurantJoinFormik.getFieldProps('email')}
                        onChangeHandler={emailHandler}
                        value={RestaurantJoinFormik.values.email}
                    />
                </CustomStackFullWidth>
                <CustomStackFullWidth
                    direction={{ xs: 'column', sm: 'row', md: 'row' }}
                    alignItems="center"
                    spacing={languageDirection==="rtl" ? 0:3}
                    gap={languageDirection==="rtl" ? "20px":"0px"}
                >
                    <CustomTextFieldWithFormik
                        type="password"
                        label={t('Password')}
                        value={RestaurantJoinFormik.values.password}
                        onChangeHandler={passwordHandler}
                        touched={RestaurantJoinFormik.touched.password}
                        errors={RestaurantJoinFormik.errors.password}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'password'
                        )}
                        required="true"

                        languageDirection={languageDirection}
                    />
                    <CustomTextFieldWithFormik
                        type="password"
                        label={t('Confirm Password')}
                        value={RestaurantJoinFormik.values.confirm_password}
                        onChangeHandler={passwordHandler}
                        touched={RestaurantJoinFormik.touched.confirm_password}
                        errors={RestaurantJoinFormik.errors.confirm_password}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'confirm_password'
                        )}
                        required="true"
                        InputLabelProps={{ shrink: true }}
                        languageDirection={languageDirection}
                    />
                </CustomStackFullWidth>
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default RestaurantLoginForm

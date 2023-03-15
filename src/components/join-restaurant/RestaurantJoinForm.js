import React from 'react'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'
import { useFormik } from 'formik'
import { Grid } from '@mui/material'
import RestaurantDetailsForm from './RestaurantDetailsForm'
import ImageSection from './ImageSection'
import MapForRestaurantJoin from './MapForRestaurantJoin'
import OwnerForm from './OwnerForm'
import RestaurantLoginForm from './RestaurantLoginForm'
import LoadingButton from '@mui/lab/LoadingButton'
import ValidationSchemaForRestaurant from './ValidationSchemaForRestaurant'
import { useTranslation } from 'react-i18next'

const RestaurantJoinForm = ({ zoneData, formSubmit }) => {
    const { t } = useTranslation()
    const RestaurantJoinFormik = useFormik({
        initialValues: {
            restaurant_name: '',
            restaurant_address: '',
            vat: '',
            min_delivery_time: '',
            max_delivery_time: '',
            logo: '',
            cover_photo: '',
            f_name: '',
            l_name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
            lat: '',
            lng: '',
            zoneId: '',
        },
        validationSchema: ValidationSchemaForRestaurant(),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
            } catch (err) {}
        },
    })

    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }
    const fNameHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('f_name', value)
    }
    const restaurantNameHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('restaurant_name', value)
    }
    const restaurantVatHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('vat', value)
    }
    const restaurantAddressHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('restaurant_address', value)
    }
    const minDeliveryTimeHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('min_delivery_time', value)
    }
    const maxDeliveryTimeHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('max_delivery_time', value)
    }
    const lNameHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('l_name', value)
    }
    const phoneHandler = (values) => {
        RestaurantJoinFormik.setFieldValue('phone', values)
    }
    const emailHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('email', value)
    }
    const passwordHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('password', value)
    }
    const singleFileUploadHandlerForImage = (value) => {
        RestaurantJoinFormik.setFieldValue('logo', value.currentTarget.files[0])
    }
    const imageOnchangeHandlerForImage = (value) => {
        RestaurantJoinFormik.setFieldValue('logo', value)
    }
    const singleFileUploadHandlerForCoverPhoto = (value) => {
        RestaurantJoinFormik.setFieldValue(
            'cover_photo',
            value.currentTarget.files[0]
        )
    }
    const imageOnchangeHandlerForCoverPhoto = (value) => {
        RestaurantJoinFormik.setFieldValue('cover_photo', value)
    }
    const zoneHandler = (value) => {
        RestaurantJoinFormik.setFieldValue('zoneId', value)
    }
    const handleLocation = (value) => {
        RestaurantJoinFormik.setFieldValue('lng', value.lat)
        RestaurantJoinFormik.setFieldValue('lat', value.lng)
    }
    return (
        <>
            <CustomBoxFullWidth padding="2rem">
                <form noValidate onSubmit={RestaurantJoinFormik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <RestaurantDetailsForm
                                RestaurantJoinFormik={RestaurantJoinFormik}
                                restaurantNameHandler={restaurantNameHandler}
                                restaurantAddressHandler={
                                    restaurantAddressHandler
                                }
                                restaurantvatHandler={restaurantVatHandler}
                                minDeliveryTimeHandler={minDeliveryTimeHandler}
                                maxDeliveryTimeHandler={maxDeliveryTimeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageSection
                                RestaurantJoinFormik={RestaurantJoinFormik}
                                singleFileUploadHandlerForImage={
                                    singleFileUploadHandlerForImage
                                }
                                imageOnchangeHandlerForImage={
                                    imageOnchangeHandlerForImage
                                }
                                singleFileUploadHandlerForCoverPhoto={
                                    singleFileUploadHandlerForCoverPhoto
                                }
                                imageOnchangeHandlerForCoverPhoto={
                                    imageOnchangeHandlerForCoverPhoto
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <MapForRestaurantJoin
                                zoneData={zoneData}
                                RestaurantJoinFormik={RestaurantJoinFormik}
                                handleLocation={handleLocation}
                                zoneHandler={zoneHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OwnerForm
                                RestaurantJoinFormik={RestaurantJoinFormik}
                                fNameHandler={fNameHandler}
                                lNameHandler={lNameHandler}
                                phoneHandler={phoneHandler}
                                passwordHandler={passwordHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RestaurantLoginForm
                                RestaurantJoinFormik={RestaurantJoinFormik}
                                emailHandler={emailHandler}
                                passwordHandler={passwordHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                // loading={isLoading}
                            >
                                {t('Submit')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </CustomBoxFullWidth>
        </>
    )
}
export default RestaurantJoinForm

import React, { useEffect } from 'react'
import { Button, Grid, Stack } from '@mui/material'
import { useFormik } from 'formik'
import CustomTextFieldWithFormik from '../../form-fields/CustomTextFieldWithFormik'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import CustomSelectWithFormik from '../../custom-select/CustomSelectWithFormik'
import ValidationSchemaForAddAddress from './ValidationSchemaForAddAddress'
import CustomPhoneInput from '../../CustomPhoneInput'
import LoadingButton from '@mui/lab/LoadingButton'

const AddressForm = ({
    deliveryAddress,
    personName,
    phone,
    lat,
    lng,
    formSubmit,
    isLoading,
}) => {
    const { t } = useTranslation()
    const typeData = [
        {
            label: t('Home'),
            value: 'home',
        },
        {
            label: t('Office'),
            value: 'Office',
        },
        {
            label: t('Others'),
            value: 'Others',
        },
    ]

    const addAddressFormik = useFormik({
        initialValues: {
            address: '',
            address_type: '',
            contact_person_name: personName ? personName : '',
            contact_person_number: phone ? phone : '',
            latitude: lat,
            longitude: lng,
            road: '',
            house: '',
            floor: '',
        },
        validationSchema: ValidationSchemaForAddAddress(),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
            } catch (err) {}
        },
    })
    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }

    const nameHandler = (value) => {
        addAddressFormik.setFieldValue('contact_person_name', value)
    }
    const numberHandler = (value) => {
        addAddressFormik.setFieldValue('contact_person_number', value)
    }
    const addressTypeHandler = (value) => {
        addAddressFormik.setFieldValue('address_type', value)
    }
    const roadHandler = (value) => {
        addAddressFormik.setFieldValue('road', value)
    }
    const houseHandler = (value) => {
        addAddressFormik.setFieldValue('house', value)
    }
    const floorHandler = (value) => {
        addAddressFormik.setFieldValue('floor', value)
    }
    useEffect(() => {
        addAddressFormik.setFieldValue('address', deliveryAddress)
    }, [deliveryAddress])

    return (
        <Stack>
            <form noValidate onSubmit={addAddressFormik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <CustomTextFieldWithFormik
                            required="true"
                            type="text"
                            label={t('Address')}
                            touched={addAddressFormik.touched.address}
                            errors={addAddressFormik.errors.address}
                            fieldProps={addAddressFormik.getFieldProps(
                                'address'
                            )}
                            value={addAddressFormik.values.address}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomSelectWithFormik
                            value={addAddressFormik.values.address_type}
                            selectFieldData={typeData}
                            inputLabel={t('Address Type')}
                            passSelectedValue={addressTypeHandler}
                            touched={addAddressFormik.touched.address_type}
                            errors={addAddressFormik.errors.address_type}
                            fieldProps={addAddressFormik.getFieldProps(
                                'address_type'
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomTextFieldWithFormik
                            required="true"
                            type="text"
                            label={t('Contact Person Name')}
                            touched={
                                addAddressFormik.touched.contact_person_name
                            }
                            errors={addAddressFormik.errors.contact_person_name}
                            fieldProps={addAddressFormik.getFieldProps(
                                'contact_person_name'
                            )}
                            onChangeHandler={nameHandler}
                            value={addAddressFormik.values.contact_person_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomPhoneInput
                            value={
                                addAddressFormik.values.contact_person_number
                            }
                            onHandleChange={numberHandler}
                            initCountry={global?.country}
                            touched={
                                addAddressFormik.touched.contact_person_number
                            }
                            errors={
                                addAddressFormik.errors.contact_person_number
                            }
                            rtlChange="true"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomTextFieldWithFormik
                            type="text"
                            label={t('Street Number')}
                            touched={addAddressFormik.touched.road}
                            errors={addAddressFormik.errors.road}
                            fieldProps={addAddressFormik.getFieldProps('road')}
                            onChangeHandler={roadHandler}
                            value={addAddressFormik.values.road}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomTextFieldWithFormik
                            type="text"
                            label={t('House')}
                            touched={addAddressFormik.touched.house}
                            errors={addAddressFormik.errors.house}
                            fieldProps={addAddressFormik.getFieldProps('house')}
                            onChangeHandler={houseHandler}
                            value={addAddressFormik.values.house}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomTextFieldWithFormik
                            type="text"
                            label={t('Floor')}
                            touched={addAddressFormik.touched.floor}
                            errors={addAddressFormik.errors.floor}
                            fieldProps={addAddressFormik.getFieldProps('floor')}
                            onChangeHandler={floorHandler}
                            value={addAddressFormik.values.floor}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={isLoading}
                            variant="contained"
                        >
                            {t('Submit')}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Stack>
    )
}
export default AddressForm

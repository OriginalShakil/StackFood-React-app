import React from 'react'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, TextField, Stack } from '@mui/material'
import CustomPhoneInput from '../CustomPhoneInput'
import { useSelector } from 'react-redux'
import CustomSelectWithFormik from '../custom-select/CustomSelectWithFormik'
import { useTranslation } from 'react-i18next'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'

const selectFieldData = [
    {
        label: 'Passport',
        value: 'passport',
    },
    {
        label: 'Nid',
        value: 'nid',
    },
]
const DeliveryManTypeData = [
    {
        label: 'FreeLancer',
        value: 'freelancer',
    },
    {
        label: 'Salary',
        value: 'salary',
    },
]

const GeneralInfoForm = ({
    zoneData,
    addDeliveryManFormik,
    phoneHandler,
    passwordHandler,
    emailHandler,
    fNameHandler,
    lNameHandler,
    identityTypeHandler,
    zoneHandler,
    deliveryManTypeHandler,
    identityNumberHandler,
}) => {
    const { t } = useTranslation()
    const { global, token } = useSelector((state) => state.globalSettings)
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    React.useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    let zoneOption = []
    zoneData?.forEach((zone) => {
        let obj = {
            label: zone.name,
            value: zone.id,
        }
        zoneOption.push(obj)
    })

    return (
        <CustomBoxFullWidth>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('First Name')}
                        touched={addDeliveryManFormik.touched.f_name}
                        errors={addDeliveryManFormik.errors.f_name}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'f_name'
                        )}
                        onChangeHandler={fNameHandler}
                        value={addDeliveryManFormik.values.f_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Last Name')}
                        touched={addDeliveryManFormik.touched.l_name}
                        errors={addDeliveryManFormik.errors.l_name}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'l_name'
                        )}
                        onChangeHandler={lNameHandler}
                        value={addDeliveryManFormik.values.l_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="email"
                        label={t('Email')}
                        touched={addDeliveryManFormik.touched.email}
                        errors={addDeliveryManFormik.errors.email}
                        fieldProps={addDeliveryManFormik.getFieldProps('email')}
                        onChangeHandler={emailHandler}
                        value={addDeliveryManFormik.values.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomPhoneInput
                        initCountry={global?.country}
                        value={addDeliveryManFormik.values.phone}
                        onHandleChange={phoneHandler}
                        touched={addDeliveryManFormik.touched.phone}
                        errors={addDeliveryManFormik.errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        type="password"
                        label={t('Password')}
                        value={addDeliveryManFormik.values.password}
                        onChangeHandler={passwordHandler}
                        touched={addDeliveryManFormik.touched.password}
                        errors={addDeliveryManFormik.errors.password}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'password'
                        )}
                        required="true"
                        languageDirection={languageDirection}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomSelectWithFormik
                        inputLabel={t('Delivery Man Type')}
                        selectFieldData={DeliveryManTypeData}
                        passSelectedValue={deliveryManTypeHandler}
                        touched={addDeliveryManFormik.touched.earning}
                        errors={addDeliveryManFormik.errors.earning}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'earning'
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomSelectWithFormik
                        selectFieldData={zoneOption}
                        inputLabel={t('Zone')}
                        passSelectedValue={zoneHandler}
                        touched={addDeliveryManFormik.touched.zoneId}
                        errors={addDeliveryManFormik.errors.zoneId}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'zoneId'
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomSelectWithFormik
                        selectFieldData={selectFieldData}
                        inputLabel={t('Identity Type')}
                        passSelectedValue={identityTypeHandler}
                        touched={addDeliveryManFormik.touched.identity_type}
                        errors={addDeliveryManFormik.errors.identity_type}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'identity_type'
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Identity Number')}
                        touched={addDeliveryManFormik.touched.identity_number}
                        errors={addDeliveryManFormik.errors.identity_number}
                        fieldProps={addDeliveryManFormik.getFieldProps(
                            'identity_number'
                        )}
                        onChangeHandler={identityNumberHandler}
                        value={addDeliveryManFormik.values.identity_number}
                    />
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default GeneralInfoForm

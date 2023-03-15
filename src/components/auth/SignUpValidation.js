import React from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const SignUpvalidation = () => {

    const{t}=useTranslation()
    return Yup.object({
        f_name:Yup.string().required(t("First name is required")),
        l_name:Yup.string().required(t("Last name is required")),
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required(t("Email is required")),
        phone: Yup.string()
            .required(t('Please give a phone number'))
            .min(10, 'number must be 10 digits'),
        password: Yup.string()
            .required(t('No password provided.'))
            .min(6, t('Password is too short - should be 6 chars minimum.')),
        confirm_password: Yup.string()
            .required(t('Confirm Password'))
            .oneOf([Yup.ref('password'), null], t('Passwords must match')),
        tandc: Yup.boolean().oneOf([true],'Message')
    })
}

export default SignUpvalidation
import React from 'react'

import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const IMAGE_SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
]

const ValidationSchemaForRestaurant = () => {
    const { t } = useTranslation()

    const FILE_SIZE = 20000000

    return Yup.object({
        restaurant_name: Yup.string().required(t('restaurant name required')),
        restaurant_address: Yup.string().required(
            t('restaurant address required')
        ),
        f_name: Yup.string().required(t('Name is required')),
        l_name: Yup.string().required(t('last name required')),
        phone: Yup.string().required(t('phone number required')),
        vat: Yup.string().required(t('vat is required')),
        min_delivery_time: Yup.string().required(t('Minimum Delivery Time')),
        max_delivery_time: Yup.string().required(t('Maximum Delivery Time')),
        lat: Yup.string().required(t('Latitude is required')),
        lng: Yup.string().required(t('Longitude is required')),
        logo: Yup.mixed()
            .required()
            .test(
                'fileSize',
                'file too large',
                (value) => value === null || (value && value.size <= FILE_SIZE)
            )
            .test(
                'fileFormat',
                t('Unsupported Format'),
                (value) => value && IMAGE_SUPPORTED_FORMATS.includes(value.type)
            ),
        cover_photo: Yup.mixed()
            .required()
            .test(
                'fileSize',
                'file too large',
                (value) => value === null || (value && value.size <= FILE_SIZE)
            )
            .test(
                'fileFormat',
                t('Unsupported Format'),
                (value) => value && IMAGE_SUPPORTED_FORMATS.includes(value.type)
            ),
        email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required(t('Email is required')),

        password: Yup.string()
            .required(t('No password provided.'))
            .min(6, t('Password is too short - should be 6 chars minimum.')),
        confirm_password: Yup.string()
            .required(t('Confirm Password required'))
            .oneOf([Yup.ref('password'), null], t('Passwords must match')),
    })
}

export default ValidationSchemaForRestaurant

import React from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const IMAGE_SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
]

const ValidationSchemaForDeliveryMan = () => {
    const { t } = useTranslation()

    const FILE_SIZE = 20000000

    return Yup.object({
        f_name: Yup.string().required(t('Name is required')),
        l_name: Yup.string().required(t('last name required')),
        phone: Yup.string().required(t('phone number required')),
        identity_number: Yup.string().required(
            t('Identity number Is A Required Field')
        ),
        identity_type: null,
        image: Yup.mixed()
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
            .min(6, t('Password is too short - should be 8 chars minimum.'))
            .required(t('Password is required')),
    })
}

export default ValidationSchemaForDeliveryMan

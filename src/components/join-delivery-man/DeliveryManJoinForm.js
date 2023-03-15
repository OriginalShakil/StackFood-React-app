import React from 'react'
import { useFormik } from 'formik'
import { Grid, InputLabel, Typography } from '@mui/material'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import SingleFileUploaderWithPreview from '../single-file-uploader-with-preview/SingleFileUploaderWithPreview'
import GeneralInfoForm from './GeneralInfoForm'
import ImageUploaderWithPreview from '../single-file-uploader-with-preview/ImageUploaderWithPreview'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import ValidationSchemaForDeliveryMan from './ValidationSchemaForDeliveryMan'
import MultiFileUploader from '../multi-file-uploader/MultiFileUploader'
import { CustomTypography } from '../custom-tables/Tables.style'

const acceptedFileInputFormat =
    'application/pdf,image/*,text/plain,.doc, .docx,.txt'
const supportedFormatMultiImages = [
    'jpg',
    'jpeg',
    'gif',
    'png',
    'pdf',
    'doc',
    'docx',
    'deb',
]

const DeliveryManJoinForm = ({ formSubmit, zoneData, isLoading }) => {
    const { t } = useTranslation()
    const addDeliveryManFormik = useFormik({
        initialValues: {
            f_name: '',
            l_name: '',
            phone: '',
            email: '',
            password: '',
            image: '',
            identity_image: '',
            earning: '',
            zoneId: '',
            identity_number: '',
            identity_type: '',
        },
        validationSchema: ValidationSchemaForDeliveryMan(),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
            } catch (err) {

            }
        },
    })

    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }
    const fNameHandler = (value) => {
        addDeliveryManFormik.setFieldValue('f_name', value)
    }
    const lNameHandler = (value) => {
        addDeliveryManFormik.setFieldValue('l_name', value)
    }
    const phoneHandler = (values) => {
        addDeliveryManFormik.setFieldValue('phone', values)
    }
    const identityNumberHandler = (value) => {
        addDeliveryManFormik.setFieldValue('identity_number', value)
    }
    const identityTypeHandler = (value) => {
        addDeliveryManFormik.setFieldValue('identity_type', value)
    }
    const deliveryManTypeHandler = (value) => {
        addDeliveryManFormik.setFieldValue('earning', value)
    }
    const zoneHandler = (value) => {
        addDeliveryManFormik.setFieldValue('zoneId', value)
    }
    const emailHandler = (value) => {
        addDeliveryManFormik.setFieldValue('email', value)
    }
    const passwordHandler = (value) => {
        addDeliveryManFormik.setFieldValue('password', value)
    }

    const singleFileUploadHandlerForImage = (value) => {
        addDeliveryManFormik.setFieldValue(
            'image',
            value.currentTarget.files[0]
        )
    }
    const imageOnchangeHandlerForImage = (value) => {
        addDeliveryManFormik.setFieldValue('image', value)
    }
    const fileImagesHandler = (files) => {
        addDeliveryManFormik.setFieldValue('identity_image', files)
    }
    return (
        <CustomBoxFullWidth padding="2rem">
            <form noValidate onSubmit={addDeliveryManFormik.handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <GeneralInfoForm
                            addDeliveryManFormik={addDeliveryManFormik}
                            phoneHandler={phoneHandler}
                            passwordHandler={passwordHandler}
                            fNameHandler={fNameHandler}
                            lNameHandler={lNameHandler}
                            emailHandler={emailHandler}
                            identityTypeHandler={identityTypeHandler}
                            identityNumberHandler={identityNumberHandler}
                            zoneHandler={zoneHandler}
                            deliveryManTypeHandler={deliveryManTypeHandler}
                            zoneData={zoneData}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomStackFullWidth
                            alignItems="center"
                            spacing={2}
                            mb=".8rem"
                        >
                            <Typography>{t('Delivery Man Image')}</Typography>
                            <ImageUploaderWithPreview
                                type="file"
                                labelText={t("file Upload")}
                                hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                                file={addDeliveryManFormik.values.image}
                                onChange={singleFileUploadHandlerForImage}
                                imageOnChange={imageOnchangeHandlerForImage}
                                width="10.75rem"
                                error={
                                    addDeliveryManFormik.touched.image &&
                                    addDeliveryManFormik.errors.image
                                }
                            />
                            {addDeliveryManFormik.touched.image &&
                                addDeliveryManFormik.errors.image && (
                                    <CustomTypography
                                        variant="subtitle2"
                                        sx={{
                                            ml: '10px',
                                            fontWeight: 'inherit',
                                            color: (theme) =>
                                                theme.palette.error.main,
                                        }}
                                    >
                                        {t('Delivery man image is required')}
                                    </CustomTypography>
                                )}
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomStackFullWidth spacing={2} mb=".8rem">
                            <Typography sx={{ textAlign: 'left' }}>
                                {t('Identity Image')}
                            </Typography>
                            <MultiFileUploader
                                fileImagesHandler={fileImagesHandler}
                                totalFiles={
                                    addDeliveryManFormik.values.identity_image
                                }
                                maxFileSize={20000000}
                                supportedFileFormats={
                                    supportedFormatMultiImages
                                }
                                acceptedFileInputFormat={
                                    acceptedFileInputFormat
                                }
                                labelText={t("file Upload")}
                                width="10.25rem"
                            />
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            {t('Submit')}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </CustomBoxFullWidth>
    )
}
export default DeliveryManJoinForm

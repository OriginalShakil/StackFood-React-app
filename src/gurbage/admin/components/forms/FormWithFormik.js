import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    useMediaQuery,
} from '@mui/material'
import { CustomTypography } from '../../../../components/custom-tables/Tables.style'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    FlexContainerCenter,
    FlexContainerSpaceBetween,
} from '../../../../styled-components/CustomStyles.style'
import {
    CustomBoxForm,
    CustomButtonForm,
    CustomFlexContainerCenter,
    CustomFormControlForFormWithFormik,
    CustomStack,
    CustomTypographyForFormWithFormik,
} from './FormWithFormik.style'
import { use } from '@mui/material/styles'
// import { Helmet } from 'react-helmet'
import FileUpload from '../../../../components/file-upload-container/FileUpload'
import MultiFileUploader from '../../../../components/multi-file-uploader/MultiFileUploader'
import { useDispatch } from 'react-redux'
import { setBusinessInfoImageReset } from '../../../../redux/slices/multiStepForm'
import SingleFileUploader from '../../../../components/single-file-uploader/SingleFileUploader'

const FormWithFormik = () => {
    const [businessInfoImages, setBusinessInfoImages] = useState([])
    const [businessInfoReset, setBusinessInfoReset] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const FILE_SIZE = 2000000
    const singleFileUploaderLabel = t('Upload File')
    const singleFileUploaderTitle = t('Add New Provider')
    const multiFileUploaderTitle = t('Add New File')
    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/png',
    ]
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
    const imageContainerRef = useRef()
    const width = 15.625
    const theme  = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const imageUploadRequirementText =
        'Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1'
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const BusinessInfoImagesHandler = (files) => {
        setBusinessInfoImages([...businessInfoImages, ...files])
    }
    const acceptedFileInputFormat =
        'application/pdf,image/*,text/plain,.doc, .docx,.txt'

    const formWithFormik = useFormik({
        initialValues: {
            general_information_name: '',
            general_information_phone: '',
            general_information_address: '',
            provider_image: null,
            business_information_identity_type: '',
            business_information_identity_number: '',
            business_information_image: businessInfoImages,
            contact_person_name: '',
            contact_person_phone: '',
            contact_person_email: '',
            account_information_email: '',
            account_information_password: '',
            account_information_confirm_password: '',
        },
        validationSchema: Yup.object({
            general_information_name: Yup.string().required(
                t('Company / Individual name is required')
            ),
            general_information_phone: Yup.string()
                .matches(phoneRegExp, t('Phone number is not valid'))
                .required(t('Phone number is required')),
            general_information_address: Yup.string().required(
                t('Address is required')
            ),
            provider_image: Yup.mixed()
                .required(t('File is required*'))
                .test(
                    'fileSize',
                    'File too large',
                    (value) =>
                        value === null || (value && value.size <= FILE_SIZE)
                )
                .test(
                    'fileFormat',
                    t('Unsupported Format'),
                    (value) => value && SUPPORTED_FORMATS.includes(value.type)
                ),
            business_information_identity_type: Yup.string(),
            business_information_identity_number: Yup.number(),
            business_information_image: null,
            contact_person_name: Yup.string().required(t('Name is required')),
            contact_person_phone: Yup.string()
                .matches(phoneRegExp, t('Phone number is not valid'))
                .required(t('Phone is required')),
            contact_person_email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required(t('Email is required')),
            account_information_email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required(t('Email is required')),
            account_information_password: Yup.string()
                .required(t('No password provided.'))
                .min(
                    8,
                    t('Password is too short - should be 8 chars minimum.')
                ),
            account_information_confirm_password: Yup.string().oneOf(
                [Yup.ref('account_information_password'), null],
                t('Passwords must match')
            ),
        }),
        onSubmit: async (values, helpers) => {
            try {

            } catch (err) {

            }
        },
    })
    const singleFileUploadHandler = (values) => {
        formWithFormik.setFieldValue('provider_image', values.target.files[0])
    }
    const fileError = () => {
        return (
            <CustomTypographyForFormWithFormik>
                {formWithFormik.errors.provider_image}
            </CustomTypographyForFormWithFormik>
        )
    }
    const deleteImage = () => {
        formWithFormik.setFieldValue('provider_image', '')
    }
    const resetHandler = () => {
        formWithFormik.resetForm()
        dispatch(setBusinessInfoImageReset(true))
        setBusinessInfoReset(true)
    }
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Form With Formik')}</title>
            {/* </Helmet> */}
            <CustomPaperBigCard>
                <form noValidate onSubmit={formWithFormik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    marginBottom="0.625rem"
                                >
                                    <CustomTypography variant="h4">
                                        {t('General Information')}
                                    </CustomTypography>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            formWithFormik.touched
                                                .general_information_name &&
                                                formWithFormik.errors
                                                    .general_information_name
                                        )}
                                        fullWidth
                                        helperText={
                                            formWithFormik.touched
                                                .general_information_name &&
                                            formWithFormik.errors
                                                .general_information_name
                                        }
                                        label={t('Company / Individual Name')}
                                        margin="normal"
                                        name="email"
                                        type="text"
                                        value={
                                            formWithFormik.values
                                                .general_information_name
                                        }
                                        {...formWithFormik.getFieldProps(
                                            'general_information_name'
                                        )}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        //autoFocus
                                        error={Boolean(
                                            formWithFormik.touched
                                                .general_information_phone &&
                                                formWithFormik.errors
                                                    .general_information_phone
                                        )}
                                        fullWidth
                                        helperText={
                                            formWithFormik.touched
                                                .general_information_phone &&
                                            formWithFormik.errors
                                                .general_information_phone
                                        }
                                        label={t('Phone')}
                                        margin="normal"
                                        name="phone"
                                        type="number"
                                        value={
                                            formWithFormik.values
                                                .general_information_phone
                                        }
                                        {...formWithFormik.getFieldProps(
                                            'general_information_phone'
                                        )}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            formWithFormik.touched
                                                .general_information_address &&
                                                formWithFormik.errors
                                                    .general_information_address
                                        )}
                                        fullWidth
                                        helperText={
                                            formWithFormik.touched
                                                .general_information_address &&
                                            formWithFormik.errors
                                                .general_information_address
                                        }
                                        label={t('Address')}
                                        margin="normal"
                                        name="address"
                                        type="text"
                                        multiline
                                        rows={4}
                                        value={
                                            formWithFormik.values
                                                .general_information_address
                                        }
                                        {...formWithFormik.getFieldProps(
                                            'general_information_address'
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FlexContainerCenter>
                                <Stack
                                    alignItems="center"
                                    spacing={3}
                                    width="100%"
                                >
                                    {formWithFormik.values.provider_image ? (
                                        <>
                                            <SingleFileUploader
                                                titleText={
                                                    singleFileUploaderTitle
                                                }
                                                labelText={
                                                    singleFileUploaderLabel
                                                }
                                                hintText={
                                                    imageUploadRequirementText
                                                }
                                                deleteImage={deleteImage}
                                                file={
                                                    formWithFormik.values
                                                        .provider_image
                                                }
                                                onChange={
                                                    singleFileUploadHandler
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <FileUpload
                                                titleText={
                                                    singleFileUploaderTitle
                                                }
                                                labelText={
                                                    singleFileUploaderLabel
                                                }
                                                hintText={
                                                    imageUploadRequirementText
                                                }
                                                anchor={imageContainerRef}
                                                color={
                                                    formWithFormik.touched
                                                        .provider_image &&
                                                    formWithFormik.errors
                                                        .provider_image
                                                }
                                                text={
                                                    imageUploadRequirementText
                                                }
                                            />
                                            <input
                                                ref={imageContainerRef}
                                                id="file"
                                                name="file"
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => {
                                                    formWithFormik.setFieldValue(
                                                        'provider_image',
                                                        e.target.files[0]
                                                    )
                                                }}
                                            />
                                        </>
                                    )}
                                </Stack>
                            </FlexContainerCenter>
                            <CustomFlexContainerCenter>
                                {formWithFormik.touched.provider_image &&
                                formWithFormik.errors.provider_image ? (
                                    <>{fileError()}</>
                                ) : null}
                            </CustomFlexContainerCenter>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    marginTop="-0.625rem"
                                    marginBottom="0.34rem"
                                >
                                    <CustomTypography gutterBottom variant="h4">
                                        {t('Business Information')}
                                    </CustomTypography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomFormControlForFormWithFormik
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            {t('Select Identity Type')}
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            //value={age}
                                            label={t('Select Identity Type')}
                                            //onChange={handleChange}
                                            {...formWithFormik.getFieldProps(
                                                'business_information_identity_type'
                                            )}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    </CustomFormControlForFormWithFormik>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label={t('Identity Number')}
                                        margin="normal"
                                        name={t('Identity Number')}
                                        type="number"
                                        {...formWithFormik.getFieldProps(
                                            'business_information_identity_number'
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomBoxForm>
                                        <MultiFileUploader
                                            titleText={multiFileUploaderTitle}
                                            labelText={singleFileUploaderLabel}
                                            //hintText="hello"
                                            acceptedFileInput={
                                                acceptedFileInputFormat
                                            }
                                            reset={businessInfoReset}
                                            width={width}
                                            businessInfoImages={
                                                BusinessInfoImagesHandler
                                            }
                                            maxFileSize={20000000}
                                            supportedFileFormats={
                                                supportedFormatMultiImages
                                            }
                                        />
                                    </CustomBoxForm>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    marginTop="-1.375rem"
                                >
                                    <FlexContainerSpaceBetween>
                                        <CustomTypography variant="h4">
                                            {t('Contact Person')}
                                        </CustomTypography>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox defaultChecked />
                                                }
                                                label={t(
                                                    'Same as general information'
                                                )}
                                            />
                                        </FormGroup>
                                    </FlexContainerSpaceBetween>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        error={Boolean(
                                            formWithFormik.touched
                                                .contact_person_name &&
                                                formWithFormik.errors
                                                    .contact_person_name
                                        )}
                                        fullWidth
                                        helperText={
                                            formWithFormik.touched
                                                .contact_person_name &&
                                            formWithFormik.errors
                                                .contact_person_name
                                        }
                                        label={t('Name')}
                                        margin="normal"
                                        name="name"
                                        type="text"
                                        value={
                                            formWithFormik.values
                                                .contact_person_name
                                        }
                                        {...formWithFormik.getFieldProps(
                                            'contact_person_name'
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={isSmall ? 0 : 2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                error={Boolean(
                                                    formWithFormik.touched
                                                        .contact_person_phone &&
                                                        formWithFormik.errors
                                                            .contact_person_phone
                                                )}
                                                fullWidth
                                                helperText={
                                                    formWithFormik.touched
                                                        .contact_person_phone &&
                                                    formWithFormik.errors
                                                        .contact_person_phone
                                                }
                                                label={t('Phone')}
                                                margin="normal"
                                                name="phone"
                                                type="number"
                                                value={
                                                    formWithFormik.values
                                                        .contact_person_phone
                                                }
                                                {...formWithFormik.getFieldProps(
                                                    'contact_person_phone'
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                //autoFocus
                                                error={Boolean(
                                                    formWithFormik.touched
                                                        .contact_person_email &&
                                                        formWithFormik.errors
                                                            .contact_person_email
                                                )}
                                                fullWidth
                                                helperText={
                                                    formWithFormik.touched
                                                        .contact_person_email &&
                                                    formWithFormik.errors
                                                        .contact_person_email
                                                }
                                                label={t('Email')}
                                                margin="normal"
                                                name="email"
                                                type="email"
                                                value={
                                                    formWithFormik.values
                                                        .contact_person_email
                                                }
                                                {...formWithFormik.getFieldProps(
                                                    'contact_person_email'
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    marginTop="1.125rem"
                                    marginBottom="0.625rem"
                                >
                                    <CustomTypography variant="h4">
                                        {t('Account Information')}
                                    </CustomTypography>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        error={Boolean(
                                            formWithFormik.touched
                                                .account_information_email &&
                                                formWithFormik.errors
                                                    .account_information_email
                                        )}
                                        fullWidth
                                        helperText={
                                            formWithFormik.touched
                                                .account_information_email &&
                                            formWithFormik.errors
                                                .account_information_email
                                        }
                                        label={t('Email')}
                                        margin="normal"
                                        name="email"
                                        type="email"
                                        value={
                                            formWithFormik.values
                                                .account_information_email
                                        }
                                        {...formWithFormik.getFieldProps(
                                            'account_information_email'
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={isSmall ? 0 : 2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                error={Boolean(
                                                    formWithFormik.touched
                                                        .account_information_password &&
                                                        formWithFormik.errors
                                                            .account_information_password
                                                )}
                                                fullWidth
                                                helperText={
                                                    formWithFormik.touched
                                                        .account_information_password &&
                                                    formWithFormik.errors
                                                        .account_information_password
                                                }
                                                label={t('Password')}
                                                margin="normal"
                                                name="password"
                                                type="password"
                                                value={
                                                    formWithFormik.values
                                                        .account_information_password
                                                }
                                                {...formWithFormik.getFieldProps(
                                                    'account_information_password'
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                error={Boolean(
                                                    formWithFormik.touched
                                                        .account_information_confirm_password &&
                                                        formWithFormik.errors
                                                            .account_information_confirm_password
                                                )}
                                                fullWidth
                                                helperText={
                                                    formWithFormik.touched
                                                        .account_information_confirm_password &&
                                                    formWithFormik.errors
                                                        .account_information_confirm_password
                                                }
                                                label={t('Confirm Password')}
                                                margin="normal"
                                                name="confirm_password"
                                                type="password"
                                                value={
                                                    formWithFormik.values
                                                        .account_information_confirm_password
                                                }
                                                {...formWithFormik.getFieldProps(
                                                    'account_information_confirm_password'
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <CustomStack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={3}
                            marginTop={1.875}
                        >
                            <CustomButtonForm
                                type="reset"
                                variant="contained"
                                onClick={resetHandler}
                            >
                                {t('Reset')}
                            </CustomButtonForm>
                            <CustomButtonForm
                                disabled={formWithFormik.isSubmitting}
                                type="submit"
                                variant="contained"
                                primaryButton
                            >
                                {t('Submit')}
                            </CustomButtonForm>
                        </CustomStack>
                    </Grid>
                </form>
            </CustomPaperBigCard>
        </>
    )
}

export default FormWithFormik

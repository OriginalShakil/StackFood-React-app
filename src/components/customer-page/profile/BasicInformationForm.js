import React, { useRef, useState } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import profileImg from '../../../../public/static/profile/pro.png'
import { ButtonBox, SaveButton } from './Profile.style'
import { useFormik } from 'formik'
import ValidationSechemaProfile from './Validation'
import ImageUploaderWithPreview from '../../single-file-uploader-with-preview/ImageUploaderWithPreview'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import LoadingButton from '@mui/lab/LoadingButton'
import { t } from 'i18next'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CustomDialogConfirm from '../../custom-dialog/confirm/CustomDialogConfirm'
import { RTL } from '../../RTL/RTL'
const BasicInformationForm = ({ data, formSubmit, deleteUserHandler }) => {
    const [openModal, setOpenModal] = useState(false)
    const imageContainerRef = useRef()
    const theme = useTheme()
    const { t } = useTranslation()
    const { f_name, l_name, phone, email, image } = data

    const { global } = useSelector((state) => state.globalSettings)
    const customerImageUrl = global?.base_urls?.customer_image_url
    const profileFormik = useFormik({
        initialValues: {
            f_name: f_name ? f_name : '',
            l_name: l_name ? l_name : '',
            email: email ? email : '',
            phone: phone ? phone : '',
            image: image ? image : '',
            password: '',
            confirm_password: '',
        },
        validationSchema: ValidationSechemaProfile(),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
            } catch (err) {}
        },
    })
    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }
    const singleFileUploadHandlerForImage = (value) => {
        profileFormik.setFieldValue('image', value.currentTarget.files[0])
    }
    const imageOnchangeHandlerForImage = (value) => {
        profileFormik.setFieldValue('image', value)
    }
    const languageDirection = localStorage.getItem('direction')

    return (
        <>
            <Grid item md={12} xs={12} padding="10px">
                <RTL direction={languageDirection}>
                    <ButtonBox onClick={() => setOpenModal(true)}>
                        <Button
                            variant="outlined"
                            type="submit"
                            startIcon={<PersonRemoveIcon />}
                            sx={{
                                color: (theme) => theme.palette.error.pureRed,
                                border: `.5px solid ${theme.palette.error.pureRed}`,
                            }}
                        >
                            <Typography fontWeight="400" fontSize="12px">
                                {' '}
                                {t('Delete My Account')}
                            </Typography>
                        </Button>
                    </ButtonBox>
                </RTL>
            </Grid>
            <form noValidate onSubmit={profileFormik.handleSubmit}>
                <Grid
                    container
                    md={12}
                    xs={12}
                    spacing={2}
                    sx={{ padding: '20px' }}
                >
                    <Grid item md={12} xs={12} textAlign="-webkit-center">
                        <Stack
                            sx={{
                                position: 'relative',
                                width: '139px',
                                // height:"147px",
                                borderRadius: '50%',
                            }}
                        >
                            <ImageUploaderWithPreview
                                type="file"
                                labelText={t('file Upload')}
                                hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                                file={profileFormik.values.image}
                                onChange={singleFileUploadHandlerForImage}
                                imageOnChange={imageOnchangeHandlerForImage}
                                width="10.75rem"
                                imageUrl={customerImageUrl}
                                borderRadius="50%"
                            />

                            {image && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '18%',
                                        right: '0px',
                                        height: '38px',
                                        width: '38px',
                                        borderRadius: '50%',
                                        background: (theme) =>
                                            theme.palette.neutral[100],
                                    }}
                                >
                                    <IconButton
                                        onClick={() =>
                                            imageContainerRef.current.click()
                                        }
                                    >
                                        <CreateIcon color={'secondary'} />
                                    </IconButton>
                                    <input
                                        ref={imageContainerRef}
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            singleFileUploadHandlerForImage(e)
                                        }}
                                    />
                                </Box>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            // label="Enter First Name"
                            variant="outlined"
                            name="f_name"
                            value={profileFormik.values.f_name}
                            onChange={profileFormik.handleChange}
                            label={t('Fast Name')}
                            required
                            error={
                                profileFormik.touched.f_name &&
                                Boolean(profileFormik.errors.f_name)
                            }
                            helperText={
                                profileFormik.touched.f_name &&
                                profileFormik.errors.f_name
                            }
                            touched={profileFormik.touched.f_name}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            // label="Enter Last Name"
                            variant="outlined"
                            name="l_name"
                            value={profileFormik.values.l_name}
                            onChange={profileFormik.handleChange}
                            label={t('Last Name')}
                            required
                            error={
                                profileFormik.touched.l_name &&
                                Boolean(profileFormik.errors.l_name)
                            }
                            helperText={
                                profileFormik.touched.l_name &&
                                profileFormik.errors.l_name
                            }
                            touched={profileFormik.touched.l_name}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            // label="Enter Email"
                            variant="outlined"
                            name="email"
                            value={profileFormik.values.email}
                            onChange={profileFormik.handleChange}
                            label={t('Email')}
                            required
                            error={
                                profileFormik.touched.email &&
                                Boolean(profileFormik.errors.email)
                            }
                            helperText={
                                profileFormik.touched.email &&
                                profileFormik.errors.email
                            }
                            touched={profileFormik.touched.email}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label={
                                <span>
                                    {t('Phone')}{' '}
                                    <span style={{ color: 'red' }}>
                                        ({t('Not changeable')})
                                    </span>{' '}
                                </span>
                            }
                            variant="outlined"
                            sx={{ width: '100%' }}
                            InputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            value={phone}
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <ButtonBox>
                            <SaveButton variant="contained" type="submit">
                                {t(' Update')}
                            </SaveButton>
                        </ButtonBox>
                    </Grid>
                </Grid>
            </form>
            <CustomDialogConfirm
                dialogTexts={t('Are you sure you want to delete your account?')}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={deleteUserHandler}
            />
        </>
    )
}
export default BasicInformationForm

import React, { useState } from 'react'
import {
    Box,
    Checkbox,
    FormGroup,
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material'
import {
    CustomBox,
    CustomFlexContainerCenterForSignIn,
    CustomFlexContainerForSignInLoginServices,
    CustomFormHeadTextContainerSignIn,
    CustomFormTailContainerForSignIn,
    CustomGrid,
    CustomImageContainerSignIn,
    CustomLogoContainerSignIn,
    CustomTypographyForSignIn,
    FlexContainerColForSignIn,
    FlexContainerSpaceBetweenForSignIn,
} from './Signin.style'
import {
    CustomColouredTypography,
    CustomColouredTypographySubtitle,
    CustomFormControlLabel,
    CustomLink,
    FlexContainerSpaceBetween,
} from '../../styled-components/CustomStyles.style'
import logo from '../../assets/images/signin/logo.png'
import surface from '../../assets/images/signin/Surface.png'
import { useTranslation } from 'react-i18next'
import GoogleRecaptcha from '../../components/google-recaptcha/GoogleRecaptcha'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AdminCredentials from './components/AdminCredentials'
import { AuthCustomButton } from '../../styled-components/AuthCustomButton'

const SignIn = (props) => {
    const defaultCredential = {
        name: 'admin@admin.com',
        pass: 'admin',
    }
    const [credential, setCredential] = useState({
        email: '',
        pass: '',
    })
    const { t } = useTranslation()
    const loginformik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('Must be a valid email'))
                .max(255)
                .required(t('Email is required')),
            password: Yup.string().max(255).required(t('Password is required')),
        }),
        onSubmit: async (values, helpers) => {
            alert(JSON.stringify(values))
        },
    })
    const defaultCredentialHandler = () => {
        loginformik.setFieldValue('email', 'admin@admin.com')
        loginformik.setFieldValue('password', 'admin')
    }
    return (
        <CustomBox>
            <Grid container>
                <CustomGrid item xs={0} sm={4} md={5}>
                    <CustomImageContainerSignIn signIn>
                        <img src={surface} alt="surface" />
                    </CustomImageContainerSignIn>
                </CustomGrid>
                <Grid item xs={12} sm={8} md={7}>
                    <FlexContainerSpaceBetweenForSignIn>
                        <FlexContainerColForSignIn>
                            <CustomLogoContainerSignIn>
                                <img src={logo} alt="logo" />
                            </CustomLogoContainerSignIn>
                            <CustomFormHeadTextContainerSignIn>
                                <CustomColouredTypography variant="h2">
                                    {t('Sign In')}
                                </CustomColouredTypography>
                                <CustomColouredTypographySubtitle variant="subtitle2">
                                    {t('Sign in to stay connected.')}
                                </CustomColouredTypographySubtitle>
                            </CustomFormHeadTextContainerSignIn>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={loginformik.handleSubmit}
                                {...props}
                            >
                                <TextField
                                    error={Boolean(
                                        loginformik.touched.email &&
                                            loginformik.errors.email
                                    )}
                                    fullWidth
                                    helperText={
                                        loginformik.touched.email &&
                                        loginformik.errors.email
                                    }
                                    label={t('Email')}
                                    margin="normal"
                                    name="email"
                                    onBlur={loginformik.handleBlur}
                                    onChange={loginformik.handleChange}
                                    type="email"
                                    value={loginformik.values.email}
                                />
                                <TextField
                                    error={Boolean(
                                        loginformik.touched.password &&
                                            loginformik.errors.password
                                    )}
                                    fullWidth
                                    helperText={
                                        loginformik.touched.password &&
                                        loginformik.errors.password
                                    }
                                    label={t('Password')}
                                    margin="normal"
                                    name="password"
                                    onBlur={loginformik.handleBlur}
                                    onChange={loginformik.handleChange}
                                    type="password"
                                    value={loginformik.values.password}
                                />
                                {loginformik.errors.submit && (
                                    <FormHelperText error>
                                        {loginformik.errors.submit}
                                    </FormHelperText>
                                )}
                                <FlexContainerSpaceBetween>
                                    <FormGroup>
                                        <CustomFormControlLabel
                                            control={<Checkbox />}
                                            label={t('Remember me?')}
                                        />
                                    </FormGroup>
                                    <CustomLink to="">
                                        <CustomColouredTypography>
                                            {t('Forgot Password')}
                                        </CustomColouredTypography>
                                    </CustomLink>
                                </FlexContainerSpaceBetween>
                                <CustomFlexContainerCenterForSignIn>
                                    <GoogleRecaptcha />
                                </CustomFlexContainerCenterForSignIn>

                                <CustomFormTailContainerForSignIn>
                                    <AuthCustomButton
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        fullWidth
                                    >
                                        {t('Login')}
                                    </AuthCustomButton>

                                    <CustomFlexContainerForSignInLoginServices>
                                        <CustomTypographyForSignIn>
                                            {t(
                                                'Want to login to your services ?'
                                            )}
                                        </CustomTypographyForSignIn>

                                        <CustomLink to="">
                                            <CustomTypographyForSignIn
                                                coloured
                                                textDecoration
                                                bold
                                            >
                                                {t('Login here')}
                                            </CustomTypographyForSignIn>
                                        </CustomLink>
                                    </CustomFlexContainerForSignInLoginServices>
                                </CustomFormTailContainerForSignIn>
                            </Box>
                        </FlexContainerColForSignIn>
                        <AdminCredentials
                            credentials={defaultCredential}
                            credentialHandler={defaultCredentialHandler}
                        />
                    </FlexContainerSpaceBetweenForSignIn>
                </Grid>
            </Grid>
        </CustomBox>
    )
}

SignIn.propTypes = {}

export default SignIn

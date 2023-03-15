import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { AuthApi } from '../../../hooks/react-query/config/authApi'
import { setToken } from '../../../redux/slices/global'
import { useTheme } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { useWishListGet } from '../../../hooks/react-query/config/wish-list/useWishListGet'
import CustomPhoneInput from '../../CustomPhoneInput'
import 'react-phone-input-2/lib/material.css'
import { useTranslation } from 'react-i18next'
import {
    CustomColouredTypography,
    CustomLink,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { setWishList } from '../../../redux/slices/wishList'
import CustomImageContainer from '../../CustomImageContainer'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { CustomBoxForModal } from '../auth.style'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import { setUser } from '../../../redux/slices/customer'
import SocialLogins from './social-login/SocialLogins'
import { CustomTypographyGray } from '../../error/Errors.style'
import { RTL } from '../../RTL/RTL'
import { loginSuccessFull } from '../../../utils/ToasterMessages'
import { onErrorResponse, onSingleErrorResponse } from '../../ErrorResponse'
import CustomModal from '../../custom-modal/CustomModal'
import OtpForm from '../forgot-password/OtpForm'
import { useVerifyPhone } from '../../../hooks/react-query/otp/useVerifyPhone'

const SignInPage = ({
    setSignInPage,
    handleClose,
    signInSuccess,
    setModalFor,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    // const [profileData,setProfileData]=useState({})
    const { t } = useTranslation()
    // const [tempToken,setTempToken]=useState("")
    const theme = useTheme()
    const dispatch = useDispatch()
    const { global, token } = useSelector((state) => state.globalSettings)
    const businessLogo = global?.base_urls?.business_logo_url
    const router = useRouter()
    const [isRemember, setIsRemember] = useState(false)
    const [openModal, setModalOpen] = useState(false)
    const [openOtpModal, setOpenOtpModal] = useState(false)
    const [otpData, setOtpData] = useState({ phone: '' })
    const [mainToken, setMainToken] = useState(null)

    let userDatafor = undefined
    if (typeof window !== 'undefined') {
        userDatafor = JSON.parse(localStorage.getItem('userDatafor'))
    }

    const loginFormik = useFormik({
        initialValues: {
            phone: userDatafor ? userDatafor.phone : '',
            password: userDatafor ? userDatafor.password : '',
            tandc: false,
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),
            password: Yup.string()
                .min(6, t('Password is too short - should be 6 chars minimum.'))
                .required(t('Password is required')),
            // tandc: Yup.boolean().oneOf([true], 'Message'),
            // termsOfService:Yup.boolean()
            //     .oneOf([true], "You must accept the terms and conditions").required(t("Password is required"))
        }),
        onSubmit: async (values, helpers) => {
            try {
                if (isRemember) {
                    localStorage.setItem('userDatafor', JSON.stringify(values))
                }
                formSubmitHandler(values)
            } catch (err) {}
        },
    })
    // const onSuccessHandler=(res)=>{
    //     alert("call")

    //     dispatch(setUser(res.data))
    //
    // }
    // const {   isError,  refetch } = useQuery(
    //     ['profile-info'],
    //     ProfileApi.profileInfo,{
    //         enabled:false,
    //         onSuccess:(res)=>{
    //             alert("call")

    //             dispatch(setUser(res.data))
    //
    //         },
    //         onError:onSingleErrorResponse
    //     }
    // )
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res.data))
        //handleClose()
    }
    const {
        data,
        isError,
        refetch: profileRefatch,
    } = useQuery(['profile-info'], ProfileApi.profileInfo, {
        enabled: false,
        onSuccess: userOnSuccessHandler,
        onError: onSingleErrorResponse,
    })
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
    }

    const { refetch: wishlistRefetch } = useWishListGet(onSuccessHandler)
    useEffect(() => {
        if (otpData?.phone !== '') {
            setOpenOtpModal(true)
        }
    }, [otpData])

    const handleTokenAfterSignIn = async (response) => {
        if (response?.data) {
            localStorage.setItem('token', response?.data?.token)
            await wishlistRefetch()
            await profileRefatch()
            toast.success(t(loginSuccessFull))
            //always set this dispatch at end line. otherwise wishlist and profile will not refetch. This dispatch closes the modal.
            dispatch(setToken(response?.data?.token))
            handleClose?.()
        }
    }

    const {
        mutate: loginMutation,
        isLoading,
        error,
    } = useMutation('sign-in', AuthApi.signIn)

    const formSubmitHandler = (values) => {
        loginMutation(values, {
            onSuccess: async (response) => {
                if (global?.customer_verification) {
                    if (
                        Number.parseInt(response?.data?.is_phone_verified) === 1
                    ) {
                        handleTokenAfterSignIn(response)
                    } else {
                        setOtpData({ phone: values?.phone })
                        setMainToken(response)
                    }
                } else {
                    handleTokenAfterSignIn(response)
                }
            },
            onError: onErrorResponse,
        })
    }

    const handleOnChange = (value) => {
        loginFormik.setFieldValue('phone', `+${value}`)
    }

    const gotoForgotPassword = () => {
        router.push('/forgot-password')
        handleClose()
    }
    const handleCheckbox = (e) => {
        // if (e.target.checked) {
        //     setIsChecked(false)
        // }
        loginFormik.setFieldValue('tandc', e.target.checked)
    }

    const rememberMeHandleChange = (e) => {
        if (e.target.checked) {
            setIsRemember(true)
        }
    }
    const handleClick = () => {
        window.open('/terms-and-conditions')
        // handleClose()
    }
    const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifiyAPi } =
        useVerifyPhone()
    const otpFormSubmitHandler = (values) => {
        const onSuccessHandler = (res) => {
            toast.success(res?.message)
            setOpenOtpModal(false)
            handleTokenAfterSignIn(mainToken)
            handleClose()
        }
        otpVerifyMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onSingleErrorResponse,
        })
    }

    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomBoxForModal>
            <RTL direction={languageDirection}>
                <CustomStackFullWidth
                    alignItems="center"
                    spacing={{ xs: 0.5, md: 2 }}
                >
                    <CustomStackFullWidth
                        alignItems="center"
                        spacing={{ xs: 1, md: 3 }}
                    >
                        <CustomImageContainer
                            src={`${businessLogo}/${global?.logo}`}
                            width="150px"
                            alt="Logo"
                        />
                        <CustomTypography
                            sx={{ fontWeight: 'bold' }}
                            component="h1"
                            variant="h4"
                        >
                            {t('Sign In')}
                        </CustomTypography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth
                        alignItems="center"
                        spacing={{ xs: 1, md: 2 }}
                    >
                        <form onSubmit={loginFormik.handleSubmit} noValidate>
                            <CustomStackFullWidth
                                alignItems="center"
                                spacing={{ xs: 2, md: 2 }}
                            >
                                <CustomPhoneInput
                                    value={loginFormik.values.phone}
                                    onHandleChange={handleOnChange}
                                    initCountry={global?.country}
                                    touched={loginFormik.touched.phone}
                                    errors={loginFormik.errors.phone}
                                    rtlChange="true"
                                />
                                <FormControl
                                    sx={{ mt: 2 }}
                                    variant="outlined"
                                    fullWidth
                                >
                                    <InputLabel
                                        required
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.neutral[1000],
                                        }}
                                        htmlFor="outlined-adornment-password"
                                    >
                                        {t('Password')}
                                    </InputLabel>
                                    <OutlinedInput
                                        required
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        value={loginFormik.values.password}
                                        onChange={loginFormik.handleChange}
                                        error={
                                            loginFormik.touched.password &&
                                            Boolean(loginFormik.errors.password)
                                        }
                                        helperText={
                                            loginFormik.touched.password &&
                                            loginFormik.errors.password
                                        }
                                        touched={loginFormik.touched.password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prevState) =>
                                                                !prevState
                                                        )
                                                    }
                                                    //   onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    {loginFormik.errors.password && (
                                        <CustomTypography
                                            variant="subtitle2"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.error.main,
                                            }}
                                        >
                                            {loginFormik.errors.password}
                                        </CustomTypography>
                                    )}
                                </FormControl>
                                <CustomStackFullWidth alignItems="flex-start">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                                onChange={
                                                    rememberMeHandleChange
                                                }
                                            />
                                        }
                                        label={
                                            <CustomTypography fontSize="14px">
                                                {t('Remember me')}
                                            </CustomTypography>
                                        }
                                    />
                                </CustomStackFullWidth>
                            </CustomStackFullWidth>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                loading={isLoading}
                            >
                                {t('Sign In')}
                            </LoadingButton>
                        </form>
                    </CustomStackFullWidth>
                    {global?.social_login.length > 0 &&
                        global?.social_login?.some(
                            (item) => item.status === true
                        ) && (
                            <CustomStackFullWidth
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}
                            >
                                <CustomTypographyGray nodefaultfont="true">
                                    {t('Or')}
                                </CustomTypographyGray>
                                <CustomTypography>
                                    {t('Social Login')}
                                </CustomTypography>
                                <SocialLogins
                                    socialLogins={global?.social_login}
                                    handleParentModalClose={handleClose}
                                />
                            </CustomStackFullWidth>
                        )}
                    <CustomStackFullWidth alignItems="center" spacing={0.5}>
                        <Typography
                            variant="body2"
                            onClick={gotoForgotPassword}
                            sx={{
                                textTransform: 'none',
                                cursor: 'pointer',
                                color: 'primary.main',
                            }}
                        >
                            {t('Forgot password?')}
                        </Typography>
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={0.5}
                        >
                            <CustomTypography>
                                {t("Don't have an account?")}
                            </CustomTypography>
                            <CustomLink
                                onClick={() => {
                                    setModalFor('sign-up')
                                }}
                                variant="body2"
                            >
                                {t('Sign Up')}
                            </CustomLink>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth>
                            <CustomColouredTypography
                                color={theme.palette.primary.main}
                                onClick={handleClick}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    textAlign: 'center',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '12px',
                                        marginLeft: '0px',
                                    },
                                }}
                            >
                                {t('Terms and conditions')}
                            </CustomColouredTypography>
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </RTL>
            <CustomModal
                openModal={openOtpModal}
                setModalOpen={setOpenOtpModal}
            >
                <OtpForm
                    data={otpData}
                    formSubmitHandler={otpFormSubmitHandler}
                    isLoading={isLoadingOtpVerifiyAPi}
                />
            </CustomModal>
        </CustomBoxForModal>
    )
}

export default SignInPage

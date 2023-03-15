import React, { useEffect, useState } from 'react'
import CustomModal from '../../../custom-modal/CustomModal'
import PhoneInputForm from './PhoneInputForm'
import CustomImageContainer from '../../../CustomImageContainer'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { usePostEmail } from '../../../../hooks/react-query/social-login/usePostEmail'
import { onErrorResponse } from '../../../ErrorResponse'
import OtpForm from '../../forgot-password/OtpForm'
import { useVerifyPhone } from '../../../../hooks/react-query/otp/useVerifyPhone'
import { toast } from 'react-hot-toast'
import facebookLatest from '../../../../../public/static/facebookLatest.png'
import { Stack } from '@mui/material'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
    setJwtTokenByDispatch,
    setUserInfoByDispatch,
} from '../../../../redux/slices/fbCredentials'
import { facebookAppId } from '../../../../utils/staticCredentials'

const FbLoginComp = (props) => {
    const { handleSuccess, global, handleParentModalClose } = props
    const { userInfo, jwtToken } = useSelector(
        (state) => state.fbCredentialsStore
    )

    const [openModal, setOpenModal] = useState(false)
    const [openOtpModal, setOpenOtpModal] = useState(false)
    const [otpData, setOtpData] = useState({ phone: '' })
    const [mainToken, setMainToken] = useState(null)
    const dispatch = useDispatch()
    const appId = facebookAppId
    const { mutate } = usePostEmail()
    const handleToken = (response) => {
        if (response?.token) {
            handleSuccess(response.token)
        } else {
            setOpenModal(true)
        }
    }
    useEffect(() => {
        if (otpData?.phone !== '') {
            setOpenOtpModal(true)
        }
    }, [otpData])
    const handlePostRequestOnSuccess = (response) => {
        if (global?.customer_verification) {
            if (Number.parseInt(response?.is_phone_verified) === 1) {
                handleToken(response)
            } else {
                if (response?.phone) {
                    setOtpData({ phone: response?.phone })
                }
                if (response?.token) {
                    setMainToken(response)
                }
            }
        } else {
            handleToken(response)
        }
    }
    const responseFacebook = async (res) => {
        dispatch(setUserInfoByDispatch(res))
        dispatch(setJwtTokenByDispatch(res))
        await mutate(
            {
                email: res?.email,
                token: res?.accessToken,
                unique_id: res?.id,
                medium: 'facebook',
                phone: res?.phone,
            },
            {
                onSuccess: handlePostRequestOnSuccess,
                onError: (error) => {
                    error?.response?.data?.errors?.forEach((item) =>
                        item.code === 'email'
                            ? handleToken()
                            : toast.error(item.message)
                    )
                },
            }
        )
    }
    const handleRegistrationOnSuccess = (token) => {
        //registration on success func remaining
        handleSuccess(token)
        handleParentModalClose()
        setOpenModal(false)
    }
    const onSuccessHandler = (res) => {
        toast.success(res?.message)
        setOpenOtpModal(false)
        handleToken(mainToken)
        handleParentModalClose()
    }
    const { mutate: signInMutate, isLoading } = useVerifyPhone()
    const formSubmitHandler = (values) => {
        signInMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }
    const { t } = useTranslation()
    return (
        <>
            <FacebookLogin
                appId={appId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                    <div
                        style={{ cursor: 'pointer', width: '100%' }}
                        onClick={renderProps.onClick}
                    >
                        <Stack
                            alignItems="center"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.newsletterBG,
                                height: '40px',
                                width: '100%',
                                borderRadius: '4px',
                                padding: '5px',
                                textAlign: 'center',
                            }}
                        >
                            <CustomStackFullWidth
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomImageContainer
                                    src={facebookLatest.src}
                                    alt="facebook"
                                    height="30px"
                                    width="30px"
                                    objectFit="contained"
                                />
                                <CustomColouredTypography
                                    variant="h5"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.whiteContainer.main,
                                    }}
                                >
                                    {t('Continue with facebook')}
                                </CustomColouredTypography>
                            </CustomStackFullWidth>
                        </Stack>
                    </div>
                )}
            />
            <CustomModal openModal={openModal} setModalOpen={setOpenModal}>
                {userInfo && jwtToken && (
                    <PhoneInputForm
                        userInfo={userInfo}
                        jwtToken={jwtToken}
                        medium="facebook"
                        handleRegistrationOnSuccess={
                            handleRegistrationOnSuccess
                        }
                    />
                )}
            </CustomModal>
            <CustomModal
                openModal={openOtpModal}
                setModalOpen={setOpenOtpModal}
            >
                <OtpForm
                    data={otpData}
                    formSubmitHandler={formSubmitHandler}
                    isLoading={isLoading}
                />
            </CustomModal>
        </>
    )
}

FbLoginComp.propTypes = {}

export default FbLoginComp

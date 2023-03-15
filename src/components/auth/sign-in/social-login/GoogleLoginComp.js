import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import { usePostEmail } from '../../../../hooks/react-query/social-login/usePostEmail'
import CustomModal from '../../../custom-modal/CustomModal'
import PhoneInputForm from './PhoneInputForm'
import OtpForm from '../../forgot-password/OtpForm'
import { toast } from 'react-hot-toast'
import { useVerifyPhone } from '../../../../hooks/react-query/otp/useVerifyPhone'
import { onErrorResponse, onSingleErrorResponse } from '../../../ErrorResponse'
import { googleClientId } from '../../../../utils/staticCredentials'
// import { gapi } from 'gapi-scrip
// import { gapi } from 'gapi-script'
const GoogleLoginComp = (props) => {
    const { handleSuccess, global, handleParentModalClose } = props
    const [userInfo, setUserInfo] = useState(null)
    const [jwtToken, setJwtToken] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [openOtpModal, setOpenOtpModal] = useState(false)
    const [otpData, setOtpData] = useState({ phone: '' })
    const [mainToken, setMainToken] = useState(null)
    const router = useRouter()

    const { mutate } = usePostEmail()

    const clientId = googleClientId
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
    const handleCallBackResponse = (res) => {
        console.log('res', res)
        const userObj = jwt_decode(res.credential)

        setJwtToken(res)
        setUserInfo(userObj)
        mutate(
            {
                email: userObj.email,
                token: res.credential,
                unique_id: res?.clientId,
                medium: 'google',
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
    const handleTokenCallBackResponse = (res) => {
        //const userObj = jwt_decode(res.credential)
        // setJwtToken(res)
        // setUserInfo(userObj)
        // mutate(
        //     { email: userObj.email },
        //     {
        //         onSuccess: handlePostRequestOnSuccess,
        //     }
        // )
    }

    useEffect(() => {
        /* global google */
        if (typeof window !== undefined) {
            window?.google?.accounts?.id?.initialize({
                client_id: clientId,
                callback: handleCallBackResponse,
            })
            window?.google?.accounts?.id?.renderButton(
                document.getElementById('signInDiv'),
                {
                    theme: 'outline',
                    size: 'large',
                }
            )
        }
    }, [])

    // const handleOnError = (res) => {
    //
    // }
    const handleRegistrationOnSuccess = (token) => {
        //registration on success func remaining
        setOpenModal(false)
        handleSuccess(token)
        handleParentModalClose()
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
    return (
        <>
            <div id="signInDiv"></div>
            <CustomModal openModal={openModal} setModalOpen={setOpenModal}>
                {userInfo && jwtToken && (
                    <PhoneInputForm
                        userInfo={userInfo}
                        jwtToken={jwtToken}
                        medium="google"
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

GoogleLoginComp.propTypes = {}

export default GoogleLoginComp

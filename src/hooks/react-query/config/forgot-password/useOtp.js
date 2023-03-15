import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'

const sendOtp = async (otpData) => {

    const { data } = await MainApi.post(
        "/api/v1/auth/verify-token",otpData
    )
    return data
}
export const useOtp = (onSuccessHandlerForOtp) => {
    return useMutation('send_otp', sendOtp,{
        onSuccess: onSuccessHandlerForOtp,
        // onError: onErrorResponse,
    })
}
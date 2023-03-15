import MainApi from '../../../api/MainApi'
import { useMutation } from 'react-query'

const sendOtp = async (otpData) => {
    const { data } = await MainApi.post('/api/v1/auth/verify-phone', {
        phone: otpData?.phone,
        otp: otpData?.reset_token,
    })
    return data
}
export const useVerifyPhone = () => {
    return useMutation('verify_phone_otp', sendOtp)
}

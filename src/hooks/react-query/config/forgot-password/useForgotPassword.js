import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'


const forgotPassword = async (phone) => {

    const { data } = await MainApi.post(
        "/api/v1/auth/forgot-password",phone
    )
    return data
}
export const useForgotPassword = ({onSuccessHandlerForForgotpass,onErrorResponse}) => {
    return useMutation('forgot_password', forgotPassword,{
        onSuccess: onSuccessHandlerForForgotpass,
         onError: onErrorResponse,
    })
}
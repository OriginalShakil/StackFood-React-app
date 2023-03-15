import MainApi from '../../../api/MainApi'
import { useMutation } from 'react-query'

const postHandler = async (info) => {
    const { data } = await MainApi.post('/api/v1/auth/social-register', info)
    return data
}
export const usePostRegisterInfo = () => {
    return useMutation('info_post_request', postHandler)
}

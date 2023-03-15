import MainApi from '../../../api/MainApi'
import { useMutation } from 'react-query'

const postHandler = async (email) => {
    const { data } = await MainApi.post('/api/v1/auth/social-login', email)
    return data
}
export const usePostEmail = () => {
    return useMutation('email_post_request', postHandler)
}

import { useMutation } from 'react-query'
import MainApi from '../../../api/MainApi'

const postHandler = async (value) => {
    const { data } = await MainApi.post('/api/v1/newsletter/subscribe', value)
    return data
}
export const usePostNewsletterEmail = () => {
    return useMutation('newsletter_email', postHandler)
}

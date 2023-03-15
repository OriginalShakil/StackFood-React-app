import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'

export const getUser = async () => {
    const { data } = await MainApi.get('/api/v1/customer/info')
    return data
}
export const useGetUser = (onSuccessHandler) => {
    return useQuery('user-info', () => getUser(), {
        enabled:false,
        onSuccess: onSuccessHandler,
    })
}
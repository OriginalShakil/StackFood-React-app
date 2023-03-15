import { useMutation } from 'react-query'
import MainApi from '../../../api/MainApi'

const postHandle = async (values) => {
    const { data } = await MainApi.post('/api/v1/customer/update-interest', values)
    return data
}

export const usePostSelectedCategory = () => {
    return useMutation('store_selected_category', postHandle)
}

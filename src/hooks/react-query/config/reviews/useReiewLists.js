import MainApi from '../../../../api/MainApi'
import { useQuery } from 'react-query'

export const ReviewLists = async ({id}) => {

    const { data } = await MainApi.get(`/api/v1/products/reviews/${id}`)
    return data
}
export const useReviewListsGet = (id,onSuccessHandler) => {
    return useQuery('reviewList', (id) => ReviewLists(id), {

        onSuccess: onSuccessHandler,
    })
}

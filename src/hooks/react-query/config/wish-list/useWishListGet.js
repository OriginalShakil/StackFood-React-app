import MainApi from '../../../../api/MainApi'
import { useQuery } from 'react-query'
import { onSingleErrorResponse } from '../../../../components/ErrorResponse'

export const WishList = async () => {
    const { data } = await MainApi.get('/api/v1/customer/wish-list')
    return data
}
export const useWishListGet = (onSuccessHandler,onErr) => {
    return useQuery('wishlist', () => WishList(), {
        enabled: false,
        onSuccess: onSuccessHandler,
        //onError:onSingleErrorResponse,
    })
}

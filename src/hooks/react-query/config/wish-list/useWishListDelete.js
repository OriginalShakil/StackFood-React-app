import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'
//import { onErrorResponse } from '../../../../components/api-response-messages/ApiResponseMessages'

const deleteData = async (wishListId) => {

    const { data } = await MainApi.delete(
        `/api/v1/customer/wish-list/remove?food_id=${wishListId}`
    )
    return data
}
export const useWishListDelete = (onSuccessHandlerForDelete) => {
    return useMutation('delete_wishlist', deleteData)
}

import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'
//import { onErrorResponse } from '../../../../components/api-response-messages/ApiResponseMessages'

const deleteData = async (wishListId) => {

    const { data } = await MainApi.delete(
        `/api/v1/customer/wish-list/remove?restaurant_id=${wishListId}`
    )
    return data
}
export const useWishListResDelete = (onSuccessHandlerForResDelete) => {
    return useMutation('delete_wishlist', deleteData, {
        onSuccess: onSuccessHandlerForResDelete,
        onError: () => {
            toast.error(t('Something went wrong.'))
        },

        // onError: onErrorResponse,
    })
}

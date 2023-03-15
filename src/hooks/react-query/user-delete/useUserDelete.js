import { useMutation } from 'react-query'
import MainApi from '../../../api/MainApi'
import {onErrorResponse, onSingleErrorResponse} from "../../../components/ErrorResponse";

const deleteUserHandler = async (value) => {
    const { data } = await MainApi.delete('/api/v1/customer/remove-account')
    return data
}
export const useUserDelete = (onSuccessHandlerForUserDelete) => {
    return useMutation('user-delete', deleteUserHandler,{
        onSuccess:onSuccessHandlerForUserDelete,
        onError: onErrorResponse
    })
}
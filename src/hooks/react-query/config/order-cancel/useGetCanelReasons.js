
import { useQuery } from 'react-query'

import MainApi from "../../../../api/MainApi";
import {onSingleErrorResponse} from "../../../../components/ErrorResponse";

export const getData = async () => {
    const { data } = await MainApi.get('api/v1/customer/order/cancellation-reasons?offset=1&limit=10&type=customer')
    return data
}
export const useGetOrderCancelReason = () => {
    return useQuery('cancel-reasons', () => getData(), {
        enabled: false,
        //onSuccess: onSuccessHandler,
        onError:onSingleErrorResponse,
    })
}
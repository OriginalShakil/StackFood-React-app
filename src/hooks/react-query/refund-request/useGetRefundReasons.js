
//imprt {onErrorResponse} from "../../../../components/ErrorResponse";
import MainApi from "../../../api/MainApi";
import {useQuery} from "react-query";


const getData = async () => {


    const {data} = await MainApi.get("/api/v1/customer/order/refund-reasons")
    return data

}
export const useGetRefundReasons = (handleRequestOnSuccess) => {
    return useQuery('get_refund_list', () => getData(), {
        // onSuccess: handleRequestOnSuccess,
        // onError: onErrorResponse,
    })
}
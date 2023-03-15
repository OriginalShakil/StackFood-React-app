import MainApi from "../../../../api/MainApi";
import {useQuery} from "react-query";
import {onErrorResponse} from "../../../../components/ErrorResponse";


const getData = async () => {
        const {data} = await MainApi.get("/api/v1/customer/message/list")
        return data

}
export const useGetChannelList = ( handleRequestOnSuccess) => {
    return useQuery('get_channel_list', () => getData(), {
        enabled: false,
        onSuccess: handleRequestOnSuccess,
        onError: onErrorResponse,
    })
}
import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async (params) => {
    const {id,page_limit,offset}=params

    const { data } = await MainApi.get(`/api/v1/cuisine/get_restaurants?cuisine_id=${id}&limit=${page_limit}&offset=${offset}`)
    return data
}
export const useGetCuisinesDetails = (params) => {
    return useQuery('cuisines-Details', () => getData(params), {
        enabled:false,
        onError:onSingleErrorResponse
    })
}
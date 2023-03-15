import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/cuisine')
    return data
}
export const useGetCuisines = () => {
    return useQuery('cuisines-list', () => getData(), {
       enabled:true,
        onError:onSingleErrorResponse
    })
}
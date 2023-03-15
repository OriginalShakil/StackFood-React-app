
import { useQuery } from 'react-query'

import MainApi from "../../../api/MainApi";
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async (pageParams) => {
    const {restaurant_id,page_limit,offset}=pageParams
    const { data } = await MainApi.get(`api/v1/products/recommended?restaurant_id=${restaurant_id}&limit=${page_limit}&offset=${offset}`)
    return data
}
export const useGetRecommendProducts = (pageParams) => {
    return useQuery('recommend-products', () => getData(pageParams), {
        enabled: false,
        onError:onSingleErrorResponse,
    })
}
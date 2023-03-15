import {useQuery} from "react-query";
import MainApi from "../../../api/MainApi";
import {onErrorResponse} from "../../../components/ErrorResponse";


const getData = async (searchKey) => {

    if (searchKey && searchKey !== '') {
        return MainApi.get(`/api/v1/categories?name=${searchKey}`)
    } else {
        return MainApi.get(`/api/v1/categories`)
    }
    return data

}
export const useGetCategories = (handleRequestOnSuccess) => {
    return useQuery('get_categories_list', () => getData(), {
        onSuccess: handleRequestOnSuccess,
        onError: onErrorResponse,
    })
}
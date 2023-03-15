import MainApi from "../../../../api/MainApi";
import {useQuery} from "react-query";


const getSearched = async (searchedString) => {

    const {data} = await MainApi.get(`/api/v1/customer/message/search-list?name=${searchedString}&limit=20& offset=1`)
    return data
}
export const  useSearchList = (searchedString,handleSearchFetchOnSuccess) => {
    return useQuery('get_search_list', () => getSearched(searchedString), {
        enabled: false,
       onSuccess:handleSearchFetchOnSuccess
    })
}
import MainApi from '../../../../api/MainApi'
import { useInfiniteQuery, useQuery } from 'react-query'
import { onErrorResponse } from '../../../../components/ErrorResponse'

const getData = async (params, pageParam) => {
    const { channelId, apiFor, page_limit, offset } = params

    const { data } = await MainApi.get(
        `/api/v1/customer/message/details?${apiFor}=${
            channelId === 'admin' ? 0 : channelId
        }?&offset=${pageParam}&limit=${page_limit}`
    )
    return data
}
export const useGetConversation = (params) => {
    return useInfiniteQuery(
        'get_conversation',
        ({ pageParam = params.offset }) => getData(params, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1
                return lastPage.messages.length > 0 ? nextPage : undefined
            },
            enabled: false,
            onError: onErrorResponse,
        }
    )
}

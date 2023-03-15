import MainApi from '../../../../api/MainApi'
import { useQuery } from 'react-query'

export const zoneList = async () => {
    const { data } = await MainApi.get('/api/v1/zone/list')
    return data
}
export const useGetZone = (onSuccessHandler) => {
    return useQuery('zone-list', () => zoneList(), {
        enabled: false,
        onSuccess: onSuccessHandler,
    })
}

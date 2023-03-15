import { useMutation } from 'react-query'
import MainApi from '../../../api/MainApi'

const postHandler = async (token) => {


    const { data } = await MainApi.post('/api/v1/customer/cm-firebase-token',{
        cm_firebase_token:token,
        _method:'put'
    })
    return data
}
export const useStoreFcm = () => {
    return useMutation('fcm_token', postHandler)

}
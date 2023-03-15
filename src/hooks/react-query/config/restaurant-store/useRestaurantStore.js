import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'
import { format } from 'date-fns'
import moment from 'moment/moment'

const storeRestaurantData = async (restaurantJoinData) => {
    const {
        restaurant_name,
        restaurant_address,
        vat,
        min_delivery_time,
        max_delivery_time,
        f_name,
        l_name,
        phone,
        email,
        logo,
        zoneId,
        password,
        lat,
        lng,
        cover_photo,
    } = restaurantJoinData

    const minDeliveryTime = moment(min_delivery_time).format('HH')
    const maxDeliveryTime = moment(max_delivery_time).format('HH')
    let formData = new FormData()

    formData.append('fName', f_name)
    formData.append('lName', l_name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('restaurant_name', restaurant_name)
    formData.append('restaurant_address', restaurant_address)
    formData.append('vat', vat)
    formData.append('min_delivery_time', minDeliveryTime)
    formData.append('max_delivery_time', maxDeliveryTime)
    formData.append('logo', logo)
    formData.append('cover_photo', cover_photo)
    formData.append('lat', lat)
    formData.append('lng', lng)
    formData.append('zone_id', zoneId)


    const { data } = await MainApi.post('/api/v1/auth/vendor/register', formData)
    return data
}
export const useRestaurantJoin = () => {
    return useMutation('restaurant_store', storeRestaurantData)
}

import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { removeToken } from '../redux/slices/global'
import { store } from '../redux/store'
import { t } from 'i18next'
import Router from 'next/router'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// const baseUrl = 'http://stackfood.6am.one/react/api/v1/'

const MainApi = axios.create({
    baseURL: baseUrl,
})

MainApi.interceptors.request.use(function (config) {
    let zoneId = undefined
    let token = undefined
    let language = undefined
    let currentLocation = undefined
    let software_id = 33571750
    let hostname = process.env.NEXT_CLIENT_HOST_URL

    if (typeof window !== 'undefined') {
        zoneId = localStorage.getItem('zoneid')
        token = localStorage.getItem('token')
        language = localStorage.getItem('language')
        currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
        //hostname = window.location.hostnam
    }
    if (currentLocation) config.headers.latitude = currentLocation.lat
    if (currentLocation) config.headers.longitude = currentLocation.lng
    if (zoneId) config.headers.zoneId = zoneId
    if (token) config.headers.authorization = `Bearer ${token}`
    if (language) config.headers['X-localization'] = language
    if (hostname) config.headers['origin'] = hostname
    config.headers['X-software-id'] = software_id

    return config
})
export default MainApi

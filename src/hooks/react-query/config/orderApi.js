import MainApi from '../../../api/MainApi'
export const OrderApi = {
    placeOrder: (formData) => {
        return MainApi.post('/api/v1/customer/order/place', formData)
    },
    orderHistory: (orderType, limit, offset) => {
        return MainApi.get(
            `/api/v1/customer/order/${orderType}?limit=${limit}&offset=${offset}`
        )
    },
    orderDetails: (order_id) => {
        return MainApi.get(`/api/v1/customer/order/details?order_id=${order_id}`)
    },
    orderTracking: (order_id) => {
        return MainApi.get(`/api/v1/customer/order/track?order_id=${order_id}`)
    },
    CancelOrder: (formData) => {
        return MainApi.post('/api/v1/customer/order/cancel', formData)
    },
    FailedPaymentMethodUpdate: (formData) => {
        return MainApi.post('/api/v1/customer/order/payment-method', formData)
    },
}

import MainApi from '../../api/MainApi'

export const ReviewApi = {
    submit: (formData) => {
        return MainApi.post('/api/v1/products/reviews/submit', formData)
    },
    deliveryman: (formData) => {
        return MainApi.post('/api/v1/delivery-man/reviews/submit', formData)
    },
}

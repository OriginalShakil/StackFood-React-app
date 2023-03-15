import MainApi from '../../../api/MainApi'

export const ReviewApi = {
    reviewList: (id) => MainApi.get(`/api/v1/restaurants/reviews?restaurant_id=${id}`),

}
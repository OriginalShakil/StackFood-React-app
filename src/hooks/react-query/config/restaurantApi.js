import MainApi from '../../../api/MainApi'

export const RestaurantsApi = {
    restaurants: ({ type, offset, page_limit, filterType, searchKey }) => {
        return MainApi.get(
            `/api/v1/restaurants/get-restaurants/${filterType}?type=${type}&name=${searchKey}&offset=${offset}&limit=${page_limit}`
        )
    },
    popularRestaurants: () => {
        return MainApi.get('/api/v1/restaurants/popular')
    },
    latestRestaurants: () => {
        return MainApi.get('/api/v1/restaurants/latest')
    },
    restaurantDetails: (id) => {
        if (id) {
            return MainApi.get(`/api/v1/restaurants/details/${id}`)
        }
    },
    typeWiseRestaurantList: ({ restaurantType, type }) => {
        return MainApi.get(`/api/v1/restaurants/${restaurantType}?type=${type}`)
    },
    addFavorite: (restaurant_id) => {
        return MainApi.post(
            `/api/v1/customer/wish-list/add?restaurant_id=${restaurant_id}`
        )
    },
}

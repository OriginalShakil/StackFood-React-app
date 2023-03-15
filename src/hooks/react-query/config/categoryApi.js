import MainApi from '../../../api/MainApi'

export const CategoryApi = {
    categories: (searchKey) => {

        if (searchKey && searchKey !== '') {
            return MainApi.get(`/api/v1/categories?name=${searchKey}`)
        } else {
            return MainApi.get(`/api/v1/categories`)
        }
    },
    // childCategories: (id) => MainApi.get(`categories/childes/${id}`)

    categoriesDetails: (id, type, offset, page_limit) => {
        return MainApi.get(
            `/api/v1/categories/products/${id}?limit=${page_limit}&offset=${offset}&type=${type}`
        )
    },
    categoriesChildes: (id) => {
        return MainApi.get(`/api/v1/categories/childes/${id}`)
    },
    categoriesDetailsForRes: (id, type, offset, page_limit) => {
        return MainApi.get(
            `/api/v1/categories/restaurants/${id}?limit=${page_limit}&offset=${offset}&type=${type}`
        )
    },
}

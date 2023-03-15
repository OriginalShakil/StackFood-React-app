import React from 'react'
import { isAvailable, isProductAvailable } from '../../utils/customFunctions'

export const getFilterChoices = (filterData, data, foodOrRestaurant) => {

    let productsList =
        foodOrRestaurant === 'products'
            ? data?.data?.products
            : data?.data?.restaurants
    if (productsList && productsList.length > 0) {
        if (filterData.rating !== '') {
            productsList = productsList.filter(
                (product) => product.avg_rating >= filterData.rating
            )
        }
        if (filterData.filterByCuisine!== []) {
            productsList = productsList.filter(
                (product) => product.cuisine?.find((item)=>filterData?.filterByCuisine?.includes(item?.name))
            )

        }
        if (!filterData.filterBy.veg && filterData.filterBy.nonVeg) {
            productsList = productsList.filter((product) => product.veg === 0)
        }
        if (!filterData.filterBy.nonVeg && filterData.filterBy.veg) {
            productsList = productsList.filter((product) => product.veg === 1)
        }
        if (filterData.filterBy.currentAvailableFoods) {
            productsList = productsList.filter((product) =>
                isAvailable(
                    product.available_time_starts,
                    product.available_time_ends
                )
            )
        }
        if (filterData.filterBy.discountedFoods) {
            productsList = productsList.filter(
                (product) => product.discount && product.discount !== 0
            )
        }
        if (filterData.price !== '') {
            productsList = productsList.filter(
                (product) =>
                    product.price >= filterData.price[0] &&
                    product.price <= filterData.price[1]
            )
        }
        if (filterData.sortBy !== '') {
            if (filterData.sortBy === 'asc') {
                productsList = productsList.sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
            }
            if (filterData.sortBy === 'dsc') {
                productsList = productsList.sort((a, b) =>
                    a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
                )
            }
        }
    }
    return productsList
}

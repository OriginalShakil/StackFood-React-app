import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isFilterDrawerOpen: false,
    bannerFood: null,
    deliveryManInfo: null,
    filterData: {
        sortBy: '',
        filterBy: {
            veg: false,
            nonVeg: false,
            currentAvailableFoods: false,
            discountedFoods: false,
        },
        filterByCuisine: [],
        price: '',
        rating: '',
    },
}

export const searchFilterSlice = createSlice({
    name: 'search-filter',
    initialState,
    reducers: {
        setSortbyByDispatch: (state, action) => {
            state.filterData.sortBy = action.payload
        },
        setFilterbyByDispatch: (state, action) => {
            state.filterData.filterBy = action.payload
        },
        setFilterbyByCuisineDispatch: (state, action) => {

            state.filterData.filterByCuisine = action.payload
        },
        setPriceByDispatch: (state, action) => {
            state.filterData.price = action.payload
        },
        setRatingByDispatch: (state, action) => {
            state.filterData.rating = action.payload
        },
        setFilterDrawerOpenByDispatch: (state, action) => {
            state.isFilterDrawerOpen = action.payload
        },
        setBannerFoodByDispatch: (state, action) => {
            state.bannerFood = action.payload
        },
        setDeliveryManInfoByDispatch: (state, action) => {
            state.deliveryManInfo = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setSortbyByDispatch,
    setFilterbyByDispatch,
    setPriceByDispatch,
    setRatingByDispatch,
    setFilterDrawerOpenByDispatch,
    setBannerFoodByDispatch,
    setDeliveryManInfoByDispatch,
    setFilterbyByCuisineDispatch
} = searchFilterSlice.actions
export default searchFilterSlice.reducer

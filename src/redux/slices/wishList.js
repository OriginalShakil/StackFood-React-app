import { createSlice } from '@reduxjs/toolkit'
import wishList from '../../components/wishlist-page/WishList'
import wishlist from '../../pages/wishlist'

const initialState = {
    wishLists: {
        food: [],
        restaurant: [],
    },
}

export const wishListSlice = createSlice({
    name: 'wishLists',
    initialState,
    reducers: {
        setWishList: (state, action) => {
            state.wishLists = action.payload
        },
        addWishList: (state, action) => {
            // const { name } = action.payload
            // const duplicate = state.wishLists?.food?.find((obj) => obj.name === name)
            wishLists: state.wishLists.food.push(action.payload)
            // return duplicate
            //     ? { wishLists: state.wishLists}
            //     : { wishLists: state.wishLists.food.push(action.payload)}
        },
        addWishListRes: (state, action) => {

            // const { name } = action.payload
            // const duplicate = state.wishLists?.food?.find((obj) => obj.name === name)
            wishLists: state.wishLists.restaurant.push(action.payload)
            // return duplicate
            //     ? { wishLists: state.wishLists}
            //     : { wishLists: state.wishLists.food.push(action.payload)}
        },
        removeWishListFood: (state = initialState, action) => {
            let tempWishList = state.wishLists.food?.filter(
                (item) => item.id !== action.payload
            )
            return {
                wishLists: {
                    ...state.wishLists,
                    food: [...tempWishList],
                },
            }
        },
        removeWishListRes: (state = initialState, action) => {
            let tempWishList = state.wishLists.restaurant?.filter(
                (item) => item.id !== action.payload
            )
            return {
                wishLists: {
                    ...state.wishLists,
                    restaurant: [...tempWishList],
                },
            }
        },
        clearWishList: (state = initialState, action) => {
            state.wishLists.food = action.payload
            state.wishLists.restaurant = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setWishList,
    removeWishListFood,
    addWishList,
    removeWishListRes,
    addWishListRes,
    clearWishList,
} = wishListSlice.actions
export default wishListSlice.reducer

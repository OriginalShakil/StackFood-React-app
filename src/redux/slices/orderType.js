import { createSlice } from '@reduxjs/toolkit'
import {searchFilterSlice} from "./searchFilter";

const initialState = {
    orderType:""
}

export const orderTypeSlice = createSlice({
    name: 'orderType',
    initialState,
    reducers: {
        setOrderType:(state, action) => {

            state.orderType= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setOrderType
} = orderTypeSlice.actions
export default orderTypeSlice.reducer

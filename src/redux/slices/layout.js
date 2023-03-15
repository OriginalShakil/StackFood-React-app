import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    iconicSidebar: false,
}

export const layoutSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIconicSidebar: (state, action) => {
            state.iconicSidebar = action.payload
        },

        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setIconicSidebar } = layoutSlice.actions
export default layoutSlice.reducer

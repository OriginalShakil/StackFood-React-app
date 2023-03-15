import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    global: undefined,
    couponInfo: null,
    couponType: '',
    token: null,
    zoneData: null,
}

export const globalSettingSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setGlobalSettings: (state, action) => {
            state.global = action.payload.data
        },
        setCustomerProfile: (state, action) => {
            state.customerProfile = action?.payload
        },
        setToken: (state, action) => {
            state.token = action?.payload
        },
        setCouponInfo: (state, action) => {
            state.couponInfo = action?.payload
        },
        setCouponType: (state, action) => {
            state.couponType = action?.payload
        },
        setZoneData: (state, action) => {
            state.zoneData = action?.payload
        },
        removeToken: (state) => {
            state.token = null
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setGlobalSettings,
    setToken,
    removeToken,
    setCustomerProfile,
    setCouponInfo,
    setCouponType,
    setZoneData,
} = globalSettingSlice.actions
export default globalSettingSlice.reducer

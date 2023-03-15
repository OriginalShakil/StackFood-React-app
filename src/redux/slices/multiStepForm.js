import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressForm: {
        f_name: '',
        l_name: '',
        address: '',
    },
    paymentForm: {
        name_on_card: '',
        card_number: '',
    },
    businessInfoImageReset: false,
    multiFileIndex: null,
}

export const multiStepFormSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setAddressForm: (state, action) => {
            state.addressForm.f_name = action.payload.first_name
            state.addressForm.l_name = action.payload.last_name
            state.addressForm.address = action.payload.address
        },
        setPaymentForm: (state, action) => {
            state.paymentForm.name_on_card = action.payload.name_on_card
            state.paymentForm.card_number = action.payload.card_number
        },
        setBusinessInfoImageReset: (state, action) => {
            state.businessInfoImageReset = action.payload
        },
        setMultiFileIndex: (state, action) => {
            state.multiFileIndex = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setAddressForm,
    setPaymentForm,
    setBusinessInfoImageReset,
    setMultiFileIndex,
} = multiStepFormSlice.actions
export default multiStepFormSlice.reducer

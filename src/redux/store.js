import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counter'
import layoutReducer from '../redux/slices/layout'
import multiStepFormReducer from './slices/multiStepForm'
import globalSettingsReducer from './slices/global'
import cartReducer from './slices/cart'
import wishListSlice from './slices/wishList'
import searchFilterSlice from './slices/searchFilter'
import fbCredentialSlice from './slices/fbCredentials'
// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         layout: layoutReducer,
//         multiStepForm: multiStepFormReducer,
//         globalSettings: globalSeetingReducer,
//     },
//     devTools: true,
// })
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from 'redux-persist'
import userSlice from './slices/customer'
import orderTypeSlice from './slices/orderType'

const persistConfig = {
    key: 'stack-food',
    storage: storage,
    blacklist: ['searchFilterStore'],
}
const reducers = combineReducers({
    counter: counterReducer,
    layout: layoutReducer,
    globalSettings: globalSettingsReducer,
    cart: cartReducer,
    wishList: wishListSlice,
    searchFilterStore: searchFilterSlice,
    user: userSlice,
    orderType: orderTypeSlice,
    fbCredentialsStore: fbCredentialSlice,
})
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            // serializableCheck: {
            //     ignoredActions: [
            //         FLUSH,
            //         REHYDRATE,
            //         PAUSE,
            //         PERSIST,
            //         PURGE,
            //         REGISTER,
            //     ],
            // },
        }),
})

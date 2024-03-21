import {configureStore} from '@reduxjs/toolkit'
import apiSlice from './slices/apiSlice'
import authenticationSliceReducer from './slices/authenticationSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authentication: authenticationSliceReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
export default store
import {configureStore} from '@reduxjs/toolkit'
import apiSlice from './slices/apiSlice'
import authenticationSliceReducer from './slices/authenticationSlice'
import configStatusSliceReducer from './slices/configStatusSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authentication: authenticationSliceReducer,
    firstRun: configStatusSliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
export default store
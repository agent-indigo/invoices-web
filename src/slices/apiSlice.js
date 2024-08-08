import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../urls'
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState()?.authentication?.user?.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  tagTypes: [
    'user',
    'invoice'
  ],
  endpoints: builder => ({})
})
export default apiSlice
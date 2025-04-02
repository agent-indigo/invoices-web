import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (
      headers, {
        getState
      }
    ) => {
      const token = getState()?.authentication?.user?.token
      token && headers.set(
        'Authorization',
        `Bearer ${token}`
      )
    }
  }),
  tagTypes: [
    'user',
    'invoice'
  ],
  endpoints: builder => ({})
})
export default apiSlice
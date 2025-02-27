import {SETUP_URL} from '../urls'
import apiSlice from './apiSlice'
const setupApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getStatus: builder.query({
      query: () => ({
        url: `${SETUP_URL}/status`,
        method: 'GET'
      })
    }),
    createRoot: builder.mutation({
      query: root => ({
        url: `${SETUP_URL}/root`,
        method: 'POST',
        body: root
      })
    })
  })
})
export const {
  useLazyGetStatusQuery,
  useCreateRootMutation
} = setupApiSlice
import {CONFIG_URL} from '../urls'
import apiSlice from './apiSlice'
const setupApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getStatus: builder.query({
      query: () => ({
        url: `${CONFIG_URL}/status`,
        method: 'GET'
      })
    }),
    setRootPassword: builder.mutation({
      query: password => ({
        url: `${CONFIG_URL}/rootUserPassword`,
        method: 'POST',
        body: password
      })
    })
  })
})
export const {
  useLazyGetStatusQuery,
  useSetRootPasswordMutation
} = setupApiSlice
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
      query: rootpw => ({
        url: `${CONFIG_URL}/rootpw`,
        method: 'POST',
        body: rootpw
      })
    })
  })
})
export const {
  useLazyGetStatusQuery,
  useSetRootPasswordMutation
} = setupApiSlice
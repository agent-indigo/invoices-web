import apiSlice from './apiSlice'
const setupApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getStatus: builder.query({
      query: () => ({
        url: '/config/status',
        method: 'GET'
      })
    }),
    setRootPassword: builder.mutation({
      query: body => ({
        url: '/config/rootUserPassword',
        method: 'POST',
        body
      })
    })
  })
})
export const {
  useLazyGetStatusQuery,
  useSetRootPasswordMutation
} = setupApiSlice
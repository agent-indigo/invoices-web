import {USERS_URL} from '../urls'
import apiSlice from './apiSlice'
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.query({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'GET'
      })
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/changePassword`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/resetPassword/${data.pk}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    addUser: builder.mutation({
      query: data => ({
        url: USERS_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    listUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET'
      }),
      providesTags: ['user']
    }),
    deleteUser: builder.mutation({
      query: pk => ({
        url: `${USERS_URL}/${pk}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['user']
    })
  })
})
export const {
  useLoginMutation,
  useLazyLogoutQuery,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useAddUserMutation,
  useListUsersQuery,
  useDeleteUserMutation
} = usersApiSlice
import {USERS_URL} from '../urls'
import apiSlice from './apiSlice'
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: user => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: user
      })
    }),
    logout: builder.query({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'GET'
      })
    }),
    changePassword: builder.mutation({
      query: update => ({
        url: `${USERS_URL}/changePassword`,
        method: 'PATCH',
        body: update
      }),
      invalidatesTags: ['user']
    }),
    resetPassword: builder.mutation({
      query: (
        id,
        update
      ) => ({
        url: `${USERS_URL}/resetPassword/${id}`,
        method: 'PATCH',
        body: update
      }),
      invalidatesTags: ['user']
    }),
    addUser: builder.mutation({
      query: user => ({
        url: USERS_URL,
        method: 'POST',
        body: user
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
      query: id => ({
        url: `${USERS_URL}/${id}`,
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
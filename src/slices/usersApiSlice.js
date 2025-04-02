import apiSlice from './apiSlice'
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: '/users/login',
        method: 'POST',
        body
      })
    }),
    logout: builder.query({
      query: () => ({
        url: '/users/logout',
        method: 'GET'
      })
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: '/users/changePassword',
        method: 'PATCH',
        body
      }),
      invalidatesTags: [
        'user'
      ]
    }),
    resetPassword: builder.mutation({
      query: (
        id,
        body
      ) => ({
        url: `/users/resetPassword/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [
        'user'
      ]
    }),
    addUser: builder.mutation({
      query: body => ({
        url: '/users',
        method: 'POST',
        body
      }),
      invalidatesTags: [
        'user'
      ]
    }),
    listUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET'
      }),
      providesTags: [
        'user'
      ]
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        'user'
      ]
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
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
                url: `${USERS_URL}/:pk/changePassword`,
                method: 'PATCH',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/:pk/resetPassword`,
                method: 'PATCH',
                body: data
            })
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
            query: () => ({
                url: `${USERS_URL}/:pk`,
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
    useLazyListUsersQuery,
    useDeleteUserMutation
} = usersApiSlice
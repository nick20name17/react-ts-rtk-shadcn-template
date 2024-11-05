import { api } from '..'

import type { User, UserAddData, UserPatchData, UserQueryParams } from './users.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], Partial<UserQueryParams>>({
            query: (queryParams) => {
                const queryParamsString = getQueryParamString(queryParams)
                return `/users?${queryParamsString}`
            },
            providesTags: ['Users']
        }),
        addUser: builder.mutation<User, UserAddData>({
            query: (data) => {
                return {
                    url: '/users',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Users']
        }),
        patchUser: builder.mutation<User, UserPatchData>({
            query: ({ id, data }) => {
                return {
                    url: `/users/${id}`,
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<User, number>({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    usePatchUserMutation,
    useDeleteUserMutation
} = usersApi

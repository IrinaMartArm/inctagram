import { baseApi } from '@/shared/assets'
import { UserProfile } from '@/shared/assets/api/public-user/types'

export const PublicUserApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicUsers: builder.query<UserProfile, { userId: number }>({
        providesTags: ['PublicUser'],
        query: userId => ({
          url: `/v1/public-user/${userId}`,
        }),
      }),
    }
  },
})

export const { getPublicUsers } = PublicUserApi.endpoints
export const { useGetPublicUsersQuery } = PublicUserApi

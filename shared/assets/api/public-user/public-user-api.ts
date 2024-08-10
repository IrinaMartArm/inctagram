import { baseApi } from '@/shared/assets'
import { UserProfile } from '@/shared/assets/api/public-user/types'

export const PublicUserApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicUser: builder.query<UserProfile, { userId: string }>({
        providesTags: ['PublicUser'],
        query: userId => ({
          url: `v1/public-user/${userId.userId}`,
        }),
      }),
    }
  },
})

export const { getPublicUser } = PublicUserApi.endpoints
export const { useGetPublicUserQuery } = PublicUserApi

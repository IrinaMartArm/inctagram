import { baseApi } from '@/shared/assets'
import { UserProfile } from '@/shared/assets/api/public-user/types'

export const PublicUserApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      publicUsers: builder.query<UserProfile, void>({
        providesTags: ['PublicUser'],
        query: username => ({
          url: `/v1/public-user/${username}`,
        }),
      }),
    }
  },
})

export const { usePublicUsersQuery } = PublicUserApi

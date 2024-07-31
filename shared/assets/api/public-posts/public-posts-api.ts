import { baseApi } from '@/shared/assets'
import { PublicPostByIdResponse, PublicPostResponse } from '@/shared/assets/api/public-posts/types'

export const PublicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      publicPostById: builder.query<PublicPostByIdResponse, string | undefined | string[]>({
        providesTags: ['PublicPosts'],
        query: postId => ({
          url: `v1/public-posts/${postId}`,
        }),
      }),

      publicPosts: builder.query<PublicPostResponse, void>({
        providesTags: ['PublicPosts'],
        query: () => ({
          url: 'v1/public-posts',
        }),
      }),
    }
  },
})

export const { usePublicPostByIdQuery, usePublicPostsQuery } = PublicPostsApi

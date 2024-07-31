import { baseApi } from '@/shared/assets'
import { PublicPostByIdResponse, PublicPostResponse } from '@/shared/assets/api/public-posts/types'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      publicPostById: builder.query<PublicPostByIdResponse, string | undefined | string[]>({
        providesTags: ['PublicPosts'],
        query: postId => ({
          url: `v1/public-posts/${postId}`,
        }),
      }),

      getPublicPosts: builder.query<PublicPostResponse, void>({
        providesTags: ['PublicPosts'],
        query: () => ({
          url: 'v1/public-posts',
        }),
      }),
    }
  },
})

export const { getPublicPostById, getPublicPosts } = publicPostsApi.endpoints
export const { useGetPublicPostByIdQuery, useGetPublicPostsQuery } = publicPostsApi

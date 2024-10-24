import { baseApi } from '@/shared/assets'
import { PostsType } from '@/shared/assets/api/post/types'
import { PublicPostArgs, PublicPostByIdResponse } from '@/shared/assets/api/public-posts/types'

export const PublicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicPostById: builder.query<PublicPostByIdResponse, PublicPostArgs>({
        providesTags: ['PublicPosts'],
        query: postId => ({
          url: `v1/public-posts/${postId.postId}`,
        }),
      }),
      getPublicPosts: builder.query<PostsType, void>({
        providesTags: ['PublicPosts'],
        query: () => ({
          method: 'GET',
          url: 'v1/public-posts',
        }),
      }),
    }
  },
})

export const {} = PublicPostsApi

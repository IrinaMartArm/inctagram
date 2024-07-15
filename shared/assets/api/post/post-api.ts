import { baseApi } from '@/shared/assets'
import {
  AddPostReq,
  DeletePostArgs,
  EditPostArgs,
  GetPostsArgs,
  PostItemTypeRes,
  PostType,
  PostsType,
  getPostArgs,
} from '@/shared/assets/api/post/types'
import { getState } from '@vitest/expect'
import { current } from 'immer'
import { unknown } from 'zod'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addPost: builder.mutation<PostType, AddPostReq>({
        invalidatesTags: ['MyPosts'],
        query: body => ({
          body: body,
          method: 'POST',
          url: `v1/post`,
        }),
      }),
      deletePost: builder.mutation<void, DeletePostArgs>({
        invalidatesTags: ['MyPosts'],
        onQueryStarted: async ({ id }, { dispatch, getState, queryFulfilled }) => {
          const patchResult = dispatch(
            postApi.util.updateQueryData('getPosts', undefined, draft => {
              if (draft) {
                const deletedPostIdx = draft.items.findIndex(el => el.id === id)

                if (deletedPostIdx !== -1) {
                  draft.items.splice(deletedPostIdx, 1)
                }
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult?.undo()
          }
        },
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/post/${id}`,
        }),
      }),

      editPost: builder.mutation<void, EditPostArgs>({
        invalidatesTags: ['MyPosts'],
        onQueryStarted: async ({ description, id }, { dispatch, getState, queryFulfilled }) => {
          const invalidatedBy = postApi.util.selectInvalidatedBy(getState(), [{ type: 'MyPosts' }])

          invalidatedBy.forEach(({ originalArgs }) => {
            dispatch(
              postApi.util.updateQueryData(
                'getPostsByUserId',
                { page: '1', pageSize: '8', userId: id },
                draft => {
                  const itemToUpdateIndex = draft.items.findIndex(post => post.id === id)

                  if (itemToUpdateIndex !== -1) {
                    return
                  }

                  draft.items[itemToUpdateIndex].description = description
                }
              )
            )
          })
          //
          try {
            await queryFulfilled
          } catch (e) {
            // patchResultPost.undo()
            // patchResultPosts.undo()
          }
        },
        query: ({ description, id }) => ({
          body: {
            description,
          },
          method: 'PUT',
          url: `v1/post/${id}`,
        }),
      }),

      getImgId: builder.mutation<{ imageId: string }, FormData>({
        query: body => ({
          body: body,
          method: 'POST',
          url: 'v1/post/photo',
        }),
      }),
      getPost: builder.query<PostItemTypeRes, getPostArgs>({
        providesTags: ['MyPosts'],
        query: body => ({
          method: 'GET',
          url: `v1/public-posts/${body.id}`,
        }),
      }),
      getPosts: builder.query<PostsType, void>({
        // forceRefetch({ currentArg, previousArg }) {
        //   return currentArg !== previousArg
        // },
        // merge: (currentCache, newItems) => {
        //   currentCache.items.push(...newItems.items)
        // },
        providesTags: ['MyPosts'],
        query: () => ({
          method: 'GET',
          url: 'v1/public-posts',
        }),
        // serializeQueryArgs: ({ endpointName }) => {
        //   return endpointName
        // },
      }),
      getPostsByUserId: builder.query<PostsType, GetPostsArgs>({
        // forceRefetch({ currentArg, previousArg }) {
        //   return currentArg !== previousArg
        // },
        // merge: (currentCache, newItems, otherArgs) => {
        //   if (!newItems) {
        //     return
        //   }
        //   currentCache.items.push(...newItems.items)
        // },
        providesTags: ['MyPosts'],
        query: ({ page, pageSize, userId }) => {
          return {
            method: 'GET',
            params: { page, pageSize },
            url: `v1/post/${userId}`,
          }
        },
        // serializeQueryArgs: ({ endpointName }) => {
        //   return endpointName
        // },
      }),
    }
  },
})

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetImgIdMutation,
  useGetPostQuery,
  useGetPostsByUserIdQuery,
  useGetPostsQuery,
} = postApi

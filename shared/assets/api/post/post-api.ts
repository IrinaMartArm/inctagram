import { baseApi } from '@/shared/assets'
import {
  AddPostReq,
  DeletePostArgs,
  EditPostArgs,
  GetPostsArgs,
  PostType,
  PostsType,
} from '@/shared/assets/api/post/types'
import { PublicUserApi } from '@/shared/assets/api/public-user/public-user-api'

const PostApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addPost: builder.mutation<PostType, AddPostReq>({
        invalidatesTags: ['PublicUser'],
        query: body => ({
          body: body,
          method: 'POST',
          url: `v1/post`,
        }),
      }),
      deletePost: builder.mutation<void, DeletePostArgs>({
        onQueryStarted: async ({ id, userId }, { dispatch, getState, queryFulfilled }) => {
          const patchResult = dispatch(
            PublicUserApi.util.updateQueryData('getPublicUser', { userId }, draft => {
              if (draft) {
                const deletedPostIdx = draft.publications.findIndex(el => el.id === id)

                if (deletedPostIdx !== -1) {
                  draft.publications.splice(deletedPostIdx, 1)
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
          const invalidatedBy = PostApi.util.selectInvalidatedBy(getState(), [{ type: 'MyPosts' }])
          const patchResults: any[] = []

          invalidatedBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                PostApi.util.updateQueryData('getPostsByUserId', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(post => post.id === id)

                  if (itemToUpdateIndex !== -1) {
                    draft.items[itemToUpdateIndex].description = description
                  }
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
              patchResult.undo()
            })
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
      getPostsByUserId: builder.query<PostsType, GetPostsArgs>({
        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.page !== previousArg?.page
        },
        merge: (currentCache, newItems) => {
          if (currentCache) {
            currentCache.items.push(...newItems.items)
            currentCache.page = newItems.page
          } else {
            return newItems
          }
        },
        providesTags: ['MyPosts'],
        query: ({ page, pageSize, userId }) => {
          return {
            method: 'GET',
            params: { page, pageSize },
            url: `v1/post/${userId}`,
          }
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
    }
  },
})

export const { getPostsByUserId } = PostApi.endpoints
export const {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetImgIdMutation,
  useGetPostsByUserIdQuery,
} = PostApi

import { baseApi } from '@/shared/assets'
import {
  AddPostReq,
  DeletePostArgs,
  EditPostArgs,
  GetPostsArgs,
  PostType,
  PostsType,
} from '@/shared/assets/api/post/types'

const PostApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addPost: builder.mutation<PostType, AddPostReq>({
        invalidatesTags: ['MyPosts'],
        // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //   await queryFulfilled
        //   dispatch(PostApi.util.invalidateTags(['MyPosts']))
        // },
        query: body => ({
          body: body,
          method: 'POST',
          url: `v1/post`,
        }),
      }),
      deletePost: builder.mutation<void, DeletePostArgs>({
        // invalidatesTags: ['MyPosts'],
        onQueryStarted: async ({ id, userId }, { dispatch, getState, queryFulfilled }) => {
          const invalidatedBy = PostApi.util.selectInvalidatedBy(getState(), [{ type: 'MyPosts' }])
          const patchResults: any[] = []

          invalidatedBy.forEach(({ originalArgs }) => {
            const patchResult = dispatch(
              PostApi.util.updateQueryData('getPostsByUserId', { userId }, draft => {
                if (draft) {
                  const deletedPostIdx = draft.items.findIndex(el => el.id === id)

                  if (deletedPostIdx !== -1) {
                    draft.items.splice(deletedPostIdx, 1)
                    draft.totalCount -= 1
                  }
                }
              })
            )

            patchResults.push(patchResult)
          })

          try {
            await queryFulfilled
          } catch {
            patchResults.forEach(result => result.undo())
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
          const existingItemsIds = currentCache.items.map(item => item.id)

          newItems.items.forEach(item => {
            if (!existingItemsIds.includes(item.id)) {
              currentCache.items.push(item)
              // currentCache.items.unshift(item)
            }
          })

          currentCache.page = newItems.page
          currentCache.totalCount = newItems.totalCount
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

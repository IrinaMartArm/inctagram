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
        // onQueryStarted: async (
        //   { description, id },
        //   { dispatch, queryFulfilled },
        // ) => {
        //   const patchResult = dispatch(
        //     postApi.util.updateQueryData("getMyPosts", {}, (draft) => {
        //       if (draft) {
        //         const editedPostIdx = draft.items.findIndex(
        //           (el) => el.id === id,
        //         );
        //
        //         if (editedPostIdx !== -1) {
        //           draft.items[editedPostIdx].description = description;
        //         }
        //       }
        //     }),
        //   );
        //
        //   try {
        //     await queryFulfilled;
        //   } catch (e) {
        //     patchResult.undo;
        //   }
        // },
        query: id => ({
          method: 'PUT',
          url: `/v1/post/${id}`,
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
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items)
        },
        providesTags: ['MyPosts'],
        query: () => ({
          method: 'GET',
          url: 'v1/public-posts',
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
      getPostsByUserId: builder.query<PostItemTypeRes[], GetPostsArgs>({
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
        merge: (currentCache, newItems, otherArgs) => {
          if (!newItems) {
            return
          }
          currentCache.push(...newItems)
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

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetImgIdMutation,
  useGetPostQuery,
  useGetPostsByUserIdQuery,
  useGetPostsQuery,
} = postApi

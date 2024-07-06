import { baseApi } from '@/shared/assets'
import {
  AddPostReq,
  DeletePostArgs,
  EditPostArgs,
  PostItemType,
  PostItemTypeRes,
  PostType,
  getPostArgs,
} from '@/shared/assets/api/post/types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addPost: builder.mutation<PostItemType, AddPostReq>({
        invalidatesTags: ['MyPosts'],
        query: body => ({
          body: body,
          method: 'POST',
          url: `v1/post`,
        }),
      }),
      deletePost: builder.mutation<void, DeletePostArgs>({
        invalidatesTags: ['MyPosts'],
        // onQueryStarted: async (
        //   { id },
        //   { dispatch, getState, queryFulfilled },
        // ) => {
        //   const patchResult = dispatch(
        //     postApi.util.updateQueryData("getMyPosts", {}, (draft) => {
        //       if (draft) {
        //         // const deletedPostIdx = draft.items.findIndex(
        //         //   (el) => el.id === id,
        //         // );
        //
        //         if (deletedPostIdx !== -1) {
        //           draft.items.splice(deletedPostIdx, 1);
        //         }
        //       }
        //     }),
        //   );
        //
        //   try {
        //     await queryFulfilled;
        //   } catch {
        //     patchResult?.undo();
        //   }
        // },
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/posts/${id}`,
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
      getPosts: builder.query<PostType, void>({
        providesTags: ['MyPosts'],
        query: () => ({
          method: 'GET',
          url: 'v1/public-posts',
        }),
      }),
      getPostsByUserId: builder.query<PostItemTypeRes[], { userId: string }>({
        providesTags: ['MyPosts'],
        query: body => ({
          method: 'GET',
          url: `v1/post/${body.userId}`,
        }),
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

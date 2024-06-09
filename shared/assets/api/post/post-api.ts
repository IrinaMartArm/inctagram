import { baseApi } from "@/shared/assets";
import {
  AddPostReq,
  AddPostResp,
  DeletePostArgs,
  EditPostArgs,
} from "@/shared/assets/api/post/types";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      addPost: builder.mutation<AddPostResp, AddPostReq>({
        invalidatesTags: ["MyPosts"],
        query: ({ description, images }) => ({
          body: { description, images },
          method: "POST",
          url: `v1/post`,
        }),
      }),
      deletePost: builder.mutation<void, DeletePostArgs>({
        invalidatesTags: ["MyPosts"],
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
          method: "DELETE",
          url: `v1/posts/${id}`,
        }),
      }),
      editPost: builder.mutation<void, EditPostArgs>({
        invalidatesTags: ["MyPosts"],
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
        query: (id) => ({
          method: "PUT",
          url: `/v1/post/${id}`,
        }),
      }),
      // getMyPosts: builder.query<any, any>({}),
    };
  },
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postApi;

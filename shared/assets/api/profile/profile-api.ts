import { baseApi } from "@/shared/assets/api";
import {
  UserPhotoArgs,
  UserProfileArgs,
} from "@/shared/assets/api/profile/types";

export const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteUserPhoto: builder.mutation<void, void>({
        query: () => ({
          method: "DELETE",
          url: "v1/user/delete-user-photo",
        }),
      }),
      fillOutProfile: builder.mutation<any, UserProfileArgs>({
        invalidatesTags: ["Me"],
        query: (arg) => ({
          body: arg,
          method: "PUT",
          url: "v1/user/fill-out-profile",
        }),
      }),
      getProfileInfo: builder.query<UserProfileArgs, void>({
        providesTags: ["Me"],
        query: () => ({
          method: "GET",
          url: "v1/user/profile-information",
        }),
      }),
      uploadUserPhoto: builder.mutation<void, UserPhotoArgs>({
        query: (body) => ({
          body: body.file,
          method: "POST",
          url: "v1/user/upload-user-photo",
        }),
      }),
    };
  },
});

export const {
  useDeleteUserPhotoMutation,
  useFillOutProfileMutation,
  useGetProfileInfoQuery,
  useUploadUserPhotoMutation,
} = ProfileApi;

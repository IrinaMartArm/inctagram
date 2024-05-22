import { baseApi } from "@/shared/assets/api";
import {
  UserProfileArgs,
  UserProfileResponse,
} from "@/shared/assets/api/profile/types";

export const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      fillOutProfile: builder.mutation<void, UserProfileArgs>({
        query: (body) => ({
          body,
          method: "PUT",
          providesTags: "Profile",
          url: "v1/user/fill-out-profile",
        }),
      }),
      profileInformation: builder.query<UserProfileResponse, void>({
        query: (arg) => ({
          url: "v1/user/profile-information",
        }),
      }),
    };
  },
});

export const { useFillOutProfileMutation, useProfileInformationQuery } =
  ProfileApi;

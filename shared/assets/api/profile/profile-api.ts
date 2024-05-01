import { baseApi } from "@/shared/assets/api";
import { UserProfileArgs } from "@/shared/assets/api/profile/types";

export const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      fillOutProfile: builder.mutation<void, UserProfileArgs>({
        query: (arg) => ({
          arg,
          method: "PUT",
          url: "v1/user/fill-out-profile",
        }),
      }),
      getProfileInfo: builder.query<UserProfileArgs, void>({
        query: (arg) => ({
          arg,
          method: "GET",
          url: "v1/user/profile-information",
        }),
      }),
    };
  },
});

export const { useFillOutProfileMutation, useGetProfileInfoQuery } = ProfileApi;

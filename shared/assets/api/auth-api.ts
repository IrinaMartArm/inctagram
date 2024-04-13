import { baseApi } from "@/shared/assets/api/base-api";
import { SignUpArgs, User } from "@/shared/assets/api/types";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      me: builder.query({
        providesTags: ["Me"],
        query: () => {
          return {
            url: "v1/auth/me",
          };
        },
      }),
      signUp: builder.mutation<User, SignUpArgs>({
        query: (body) => ({
          body,
          method: "POST",
          providesTags: ["Me"],
          url: "v1/auth/registration",
        }),
      }),
    };
  },
});

export const { useMeQuery, useSignUpMutation } = AuthApi;

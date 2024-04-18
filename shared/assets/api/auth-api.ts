import { baseApi } from "@/shared/assets/api/base-api";
import { SignInArgs, SignInResponse } from "@/shared/assets/api/types";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<SignInResponse, SignInArgs>({
        query: (body) => ({
          body: {
            email: body.email,
            password: body.password,
          },
          invalidatesTags: ["Me"],
          method: "POST",
          url: "v1/auth/login",
        }),
      }),
      me: builder.query<any, void>({
        providesTags: ["Me"],
        query: () => {
          return {
            url: "v1/auth/me",
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useMeQuery } = AuthApi;

import { baseApi } from "@/shared/assets";
import {
  ConformationArgs,
  EmailResendingArgs,
  ErrorsMessages,
  LoginArgs,
  LoginResponse,
  MeResponse,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  SignUpArgs,
  User,
} from "@/shared/assets/api/auth/types";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createNewPassword: builder.mutation<void, NewPasswordArgs>({
        query: (body) => ({
          body,
          method: "POST",
          providesTags: ["Me"],
          url: "v1/auth/new-password",
        }),
      }),
      emailResending: builder.mutation<ErrorsMessages, EmailResendingArgs>({
        query: (body) => ({
          body,
          method: "POST",
          url: "v1/auth/registration-email-resending",
        }),
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
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
      logout: builder.mutation<void, void>({
        invalidatesTags: ["Me"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            AuthApi.util.updateQueryData("me", undefined, () => {}),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        query: () => ({
          method: "POST",
          url: "v1/auth/logout",
        }),
        transformErrorResponse: (response) => handleErrorResponse(response),
      }),
      me: builder.query<User, void>({
        extraOptions: { maxRetries: 1 },
        providesTags: ["Me"],

        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            method: "GET",
            url: `v1/auth/me`,
          });

          return {
            data:
              result.data === undefined
                ? ("" as unknown as User)
                : (result.data as User),
          };
        },
      }),
      passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
        query: (body) => ({
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          providesTags: ["Me"],
          url: "v1/auth/password-recovery",
        }),
      }),
      registrationConfirmation: builder.mutation<
        ErrorsMessages,
        ConformationArgs
      >({
        query: (body) => ({
          body,
          method: "POST",
          providesTags: ["Me"],
          url: "v1/auth/registration-confirmation",
        }),
      }),
      signUp: builder.mutation<void, SignUpArgs>({
        query: (body) => ({
          body,
          method: "POST",
          providesTags: ["Me"],
          url: "v1/auth/registration",
        }),
      }),
    };
  },
  overrideExisting: true,
});

export const {
  useCreateNewPasswordMutation,
  useEmailResendingMutation,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = AuthApi;

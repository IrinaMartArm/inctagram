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
} from "@/shared/assets/api/auth/types";
import { baseApi } from "@/shared/assets/api/base-api";

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
      me: builder.query<MeResponse, void>({
        providesTags: ["Me"],
        query: () => "v1/auth/me",
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
      signUp: builder.mutation<ErrorsMessages, SignUpArgs>({
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

export const {
  useCreateNewPasswordMutation,
  useEmailResendingMutation,
  useLoginMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = AuthApi;

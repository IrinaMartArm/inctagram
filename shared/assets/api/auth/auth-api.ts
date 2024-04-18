import {
  ConformationArgs,
  EmailResendingArgs,
  ErrorsMessages,
  NewPasswordArgs,
  SignUpArgs,
  User,
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
      me: builder.query<User, void>({
        providesTags: ["Me"],
        query: () => "v1/auth/me",
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
  useMeQuery,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = AuthApi;

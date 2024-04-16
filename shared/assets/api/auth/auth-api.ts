import {
  ConformationArgs,
  ErrorsMessages,
  SignUpArgs,
  User,
  emailResendingArgs,
} from "@/shared/assets/api/auth/types";
import { baseApi } from "@/shared/assets/api/base-api";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      emailResending: builder.mutation<ErrorsMessages, emailResendingArgs>({
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
  useEmailResendingMutation,
  useMeQuery,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = AuthApi;

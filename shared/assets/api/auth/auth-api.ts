import {
  ConformationArgs,
  ErrorsMessages,
  LoginArgs,
  LoginResponse,
  MeResponse,
  SignUpArgs,
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
  useLoginMutation,
  useMeQuery,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = AuthApi;

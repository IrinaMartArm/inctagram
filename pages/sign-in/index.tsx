import { authActions } from "@/entities";
import {
  useLoginMutation,
  useMeQuery,
} from "@/shared/assets/api/auth/auth-api";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAppDispatch } from "@/shared/assets/api/store";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignInCard } from "@/widgets";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";

const SignIn = () => {
  const { t } = useTranslation();
  const { errors, title } = t.signIn;
  const [login] = useLoginMutation();

  useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap();

      if (data) {
        const accessToken = data.accessToken;

        localStorage.setItem("accessToken", accessToken);

        await router.replace("/my-profile");
      }

      dispatch(authActions.setError(undefined));
    } catch (err: unknown) {
      const { status } = err as FetchBaseQueryError;
      const errorMessage =
        status === 401 ? errors.loginError : errors.unknownError;

      dispatch(authActions.setError(errorMessage));
    }
  };

  return (
    <PageWrapper>
      <HeadMeta title={title} />
      <SignInCard onSubmit={loginHandler} />
    </PageWrapper>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

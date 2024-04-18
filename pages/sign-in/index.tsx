import { authActions } from "@/entities/auth/auth-slice";
import { useLoginMutation, useMeQuery } from "@/shared/assets/api/auth-api";
import { useAppDispatch } from "@/shared/assets/api/store";
import { ErrorsData, LoginArgs } from "@/shared/assets/api/types";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignInCard } from "@/widgets";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";

const SignIn = () => {
  const { t } = useTranslation();
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

        await router.replace("/profile");
      }

      dispatch(authActions.setError(undefined));
    } catch (err: unknown) {
      const { data } = err as FetchBaseQueryError;
      const errorMessage = (data as ErrorsData).errorsMessages[0].message;

      dispatch(authActions.setError(errorMessage));
    }
  };

  return (
    <PageWrapper>
      <HeadMeta title={t.signIn.title} />
      <SignInCard onSubmit={loginHandler} />
    </PageWrapper>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

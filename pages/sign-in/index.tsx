import { authActions } from "@/entities";
import {
  useLazyMeQuery,
  useLoginMutation,
} from "@/shared/assets/api/auth/auth-api";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAppDispatch } from "@/shared/assets/api/store";
import { Paths } from "@/shared/assets/constants/paths";
import { useTranslationPages } from "@/shared/assets/hooks";
import { HeadMeta } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignInCard } from "@/widgets";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";

const SignIn = () => {
  const { t } = useTranslationPages();
  const [login] = useLoginMutation();
  const [getUser, {}] = useLazyMeQuery();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap();

      if (data) {
        const accessToken = data.accessToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", args.email);

        const res = await getUser().unwrap();

        await router.push(`${Paths.PROFILE}/?id=${res?.userId!}`);
        dispatch(authActions.setIsAuth(true));
      }

      dispatch(authActions.setError(undefined));
    } catch (err: unknown) {
      const { status } = err as FetchBaseQueryError;
      const errorMessage = status === 401 ? t.loginError : t.unknownError;

      dispatch(authActions.setError(errorMessage));
    }
  };

  return (
    <>
      <HeadMeta title={t.title} />
      <SignInCard onSubmit={loginHandler} />
    </>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

import { authActions } from "@/entities";
import {
  useLazyMeQuery,
  useLoginMutation,
} from "@/shared/assets/api/auth/auth-api";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAppDispatch } from "@/shared/assets/api/store";
import { Paths } from "@/shared/assets/constants/paths";
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
  const [getUser, {}] = useLazyMeQuery();

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap();

      if (data) {
        const accessToken = data.accessToken;

        localStorage.setItem("accessToken", accessToken);

        const res = await getUser().unwrap();

        console.log(accessToken);

        console.log(res.userId);

        // const response = await fetch("https://inctagram.org/api/v1/auth/me", {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //     "Content-Type": "application/json",
        //   },
        //   method: "GET",
        // });
        //
        // if (!response.ok) {
        //   console.error("Network response was not ok");
        //
        //   // Handle error...
        //   return;
        // }
        // const dataMe = await response.json();
        //
        // console.log("Data received:", dataMe.userId);

        await push(`${Paths.PROFILE}/?id=${res?.userId!}`);
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

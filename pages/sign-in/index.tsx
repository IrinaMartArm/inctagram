import { authActions } from "@/entities/auth/auth-slice";
import { useLoginMutation, useMeQuery } from "@/shared/assets/api/auth-api";
import { useAppDispatch } from "@/shared/assets/api/store";
import { SignInArgs } from "@/shared/assets/api/types";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignInCard } from "@/widgets";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";

type Error = {
  field: string;
  message: string;
};

type Errors = {
  errorsMessages: Error[];
};

const SignIn = () => {
  const [login] = useLoginMutation();

  useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = async (args: SignInArgs) => {
    try {
      const data = await login(args).unwrap();

      if (data) {
        const accessToken = data.accessToken;

        localStorage.setItem("accessToken", accessToken);

        await router.push("/profile");
      }

      dispatch(authActions.setError(undefined));
    } catch (err: unknown) {
      const { data } = err as FetchBaseQueryError;
      const errorMessage = (data as Errors).errorsMessages[0].message;

      dispatch(authActions.setError(errorMessage));
    }
  };

  return (
    <PageWrapper>
      <HeadMeta title={"Sign In"} />
      <SignInCard onSubmit={loginHandler} />
    </PageWrapper>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

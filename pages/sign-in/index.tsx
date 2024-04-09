import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignInCard } from "@/widgets";

const SignIn = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Sign In"} />
      <SignInCard />
    </PageWrapper>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignUpCard } from "@/widgets/signUp/ui/SignUp";

const SignUp = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Sign Up"} />
      <SignUpCard />
    </PageWrapper>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;

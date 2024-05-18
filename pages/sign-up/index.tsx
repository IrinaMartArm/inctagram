import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { SignUpCard } from "@/widgets/signUp/ui/SignUp";

const SignUp = () => {
  return (
    <>
      <HeadMeta title={"Sign Up"} />
      <SignUpCard />
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;

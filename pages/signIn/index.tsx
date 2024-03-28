import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const SignIn = () => {
  return (
    <>
      <HeadMeta title={"Sign In"} />
      <div>SignIn</div>
    </>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;

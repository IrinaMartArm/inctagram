import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";

const SignUp = () => {
  return (
    <>
      <HeadMeta title={"Sign Up"} />
      <div>SignUp</div>
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;
